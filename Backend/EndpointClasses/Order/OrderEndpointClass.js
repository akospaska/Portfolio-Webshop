const MongoClient = require("mongodb").MongoClient;

const sendOrderSummaryEmailTemplate = require("../../Classes/EmailSending/EmailTemplates/EmailTemplates");
const Order = require("../../Classes/Order/Order");
const ShoppingCart = require("../../Classes/ShoppingCart/ShoppingCart");
const GLSAPI = require("../../Backend/Api/GLSAPI");
const LabelCreation = require("../../Classes/GLS/LabelCreation/LabelCreation");
const PrintLabelRequest = require("../../Classes/GLS/PrintLabelRequest/PrintLabelRequest");

const EmailTemplates = require("../../Classes/EmailSending/EmailTemplates/EmailTemplates");

const Logging = require("../../Classes/Logging/Logging");

const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");

const GraphQlConfig = require("../../Backend/Api/GRAPHQL");

const axios = require("axios");

/* const reqbody = {
  ClientNumberList: [],
  Password: ["Lots of number!"],
  Username: "akos.paska@gls-hungary.com",
  ParcelList: [
    {
      CODAmount: null,
      CODCurrency: "",
      CODReference: "Content",
      ClientNumber: 100000001,
      ClientReference: "ClientReference",
      Content: "CodReference",
      Count: 1,
      DeliveryAddress: {
        City: "Cimzett varos",
        ContactEmail: "example@gmail.com",
        ContactName: "Cimzett neve",
        ContactPhone: "+36202222222",
        CountryIsoCode: "hu",
        HouseNumber: "15",
        HouseNumberInfo: "Egyeb info",
        Name: "Teszt Cimzett",
        Street: "Cimzett utca",
        ZipCode: "6000",
      },
      ParcelNumber: null,
      PickupAddress: {
        City: "Teszt varos",
        ContactEmail: "example@gmail.com",
        ContactName: "Teszt felado",
        ContactPhone: "+36202222222",
        CountryIsoCode: "hu",
        HouseNumber: "15",
        HouseNumberInfo: "Egyéb info",
        Name: "Teszt felado",
        Street: "Teszt Utca",
        ZipCode: "6000",
      },
      PickupDate: "/Date(1636070400000+0200)/",
      ServiceList: [],
    },
  ],
  PrintPosition: 1,
  ShowPrintDialog: false,
  TypeOfPrinter: "",
}; */

const order = new Order();
const sendEmail = new sendOrderSummaryEmailTemplate();
const shoppingCart = new ShoppingCart();
const label = new LabelCreation();
const logging = new Logging();
const printLabels = new PrintLabelRequest();

/* const sendLoginDetails = async () => {
  try {
    const apiResponse = await BackendRESTrequest.post("/login", { email: loginEmail, password: password });
    dispatch(setLoginStatus(apiResponse.data.isLoggedIn));
    dispatch(setRefreshCartSize(apiResponse.data.cart.length));
    dispatch(setAdminStatus(apiResponse.data.isAdminAccount));
    window.location.href = "/";
  } catch (error) {
    () => alert(error);
  }
}; */

class OrderEndpointClass {
  async OrderVerification(req, res) {
    //get the sessionKey and the orderId from the request body
    const { sessionKey, orderId } = req.query;

    //Get the contactPerson, deliveryAddress etc.
    const contactPerson = await order.getContactPerson(sessionKey, orderId);

    //modify the confirmed status by the orderId to true
    const modifyConfirmerRecord = await order.modifyConfirmedStatusByOrderId(sessionKey, orderId);

    //If the update wasn't success, that means the data are incorrect. Return right away.
    if (modifyConfirmerRecord.changedRows != 1) {
      res.send(404);
      return;
    }

    //Collect the order's items and the prices when the order has been set
    const orderItems = await order.collectOrderItemsWithFinalPrice(orderId);

    //Send e-mail notification about the order
    const sendSummaryEmail = await sendEmail.sendOrderSummaryEmailTemplate(contactPerson.Email, orderItems, contactPerson.DeliveryName);

    res.redirect(307, "/");
  }
  async PrintOrders(req, res) {
    //get a new printActionId
    const newPrintActionId = new Date().getTime();

    const { printOrientation, orderIds, typeOfPrinter, printPosition, selectedMyglsAccount, actualPickupAddressId } = req.body;

    //collect the orders, the products and the delivery addresses
    const collectedOrders = await order.collectOrderDetails(orderIds);

    //build the request body for the GLS print label API request
    const reqbody = await printLabels.getPrintLabelsBodyJson(
      collectedOrders,
      selectedMyglsAccount,
      typeOfPrinter,
      actualPickupAddressId,
      printPosition,
      printOrientation
    );

    //set the apiresp based on the API response
    let apiresp;

    try {
      apiresp = await GLSAPI.post("", reqbody);
    } catch (error) {
      apiresp = error;

      console.log(error);
    }

    //AFTER THE REQUEST

    try {
      //if the request was successful

      //collect the response's error data and the orderId's what contain error if exists
      const errorData = apiresp.data.PrintLabelsErrorList;

      let orderIdsWithError = [];
      let printedOrderIds = [];

      //iterate over the PrintLabelsErrorList array
      errorData.map((errorDataItem) => {
        errorDataItem.ClientReferenceList.map(async (ClientReferenceListItem) => {
          let orderIdWithError = Number(ClientReferenceListItem.replace(/^\D+/g, ""));

          orderIdsWithError.findIndex((a) => a == orderIdWithError) == -1 ? orderIdsWithError.push(orderIdWithError) : "";

          //insert the error descriptions into the database based on the orderId
          await logging.insertPrintErrorList(orderIdWithError, errorDataItem.ErrorDescription, errorDataItem.ErrorCode);
        });
      });

      //collect the successfully generated labels and the orderIds
      const printLabelsInfoList = apiresp.data.PrintLabelsInfoList;

      //iterate over the PrintLabelsInfoList array
      let parcelNumbersWithOrderId = [];

      printLabelsInfoList.map(async (a) => {
        let printedOrderId = Number(a.ClientReference.replace(/^\D+/g, ""));
        printedOrderIds.findIndex((printOrderId) => printOrderId == printedOrderId) == -1 ? printedOrderIds.push(printedOrderId) : "";

        const searchIndex = parcelNumbersWithOrderId.findIndex((indexfinder) => indexfinder.orderId == printedOrderId);

        if (searchIndex == -1) parcelNumbersWithOrderId.push({ orderId: printedOrderId, ParcelNumber: a.ParcelNumber });

        //insert into the database the printed parcelnumbers based on the orderId
        await logging.insertParcelNumbersList(a.ParcelNumber, a.ParcelId, printedOrderId, printOrientation);
      });

      //if the orderIdsWithError array contains values, then set the orderId's status to "issue during printed" and insert the values into the loghistory Table
      if (orderIdsWithError.length > 0) {
        await logging.setOrderStatus(orderIdsWithError, 4);
        await logging.insertLoghistoryToMysqlDB(orderIdsWithError, newPrintActionId, 0);
      }

      //if the printedOrderIds array contains values, then set the orderId's status to "printed" and insert the values into the loghistory Table
      if (printedOrderIds.length > 0) {
        await logging.setOrderStatus(printedOrderIds, 5);
        await logging.insertLoghistoryToMysqlDB(printedOrderIds, newPrintActionId, 1);
      }

      if (apiresp.data.Labels != null) {
        //if the Labels Array contains values == GLS label printing api request was success

        //insert the API response to the MongoDB (The response contains the Labels too)
        await logging.insertLogFileToMongoDB(
          reqbody,
          apiresp.data,
          "printlabels",
          true,
          newPrintActionId,
          "https://api.test.mygls.hu/ParcelService.svc/json/printlabels"
        );

        //send the emails
        //collect the email addresses, delivery names, and the tracking numbers
        printedOrderIds.map(async (a) => {
          const { ContactPerson, OrderItems, OrderFinalPrice } = collectedOrders.find((order) => order.id == a);
          const { ParcelNumber } = parcelNumbersWithOrderId.find((parcelnumber) => (parcelnumber.orderId = a));
          await sendEmail.sendOrderDispatchedEmailTemplate(ContactPerson.Email, OrderItems, ContactPerson.DeliveryName, OrderFinalPrice, ParcelNumber);
        });

        //Send the API response summary back to the frontend
        res.send({ printActionId: newPrintActionId, pdfCreated: true, containsError: orderIdsWithError.length > 0 });
      } else {
        //if the GLS printing label API response doesn't contain any Label

        //Strore the logFile into the mongoDB with different parameters
        await logging.insertLogFileToMongoDB(
          reqbody,
          apiresp.data,
          "printlabels",
          false,
          newPrintActionId,
          "https://api.mygls.hu/ParcelService.svc/json/printlabels"
        );
        res.send({ printActionId: newPrintActionId, pdfCreated: false, containsError: true });
      }
    } catch (error) {
      //If the API response was unsuccessfull
      const customResponseBody = { status: apiresp.response.status, statusText: apiresp.response.statusText };

      //store the API result into the mongo DB
      await logging.insertLogFileToMongoDB(
        reqbody,
        customResponseBody,
        "printlabels",
        false,
        newPrintActionId,
        "https://api.mygls.hu/ParcelService.svc/json/printlabels"
      );

      req.body.orderIds.map(async (a) => await logging.insertPrintErrorList(a, customResponseBody.statusText, customResponseBody.status));
      res.send({ printActionId: newPrintActionId, pdfCreated: false, containsError: true });
    }
  }
  //CUTTED FROM HERE
}

module.exports = OrderEndpointClass;
