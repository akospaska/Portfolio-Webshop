const GraphQlConfig = require("../../../Backend/Api/GRAPHQL");
const Cryption = require("../../Authentication/Cryption");

const cryption = new Cryption();

const MyglsServices = require("./MyglsServices");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");
const axios = require("axios");
const myglsServices = new MyglsServices();

class PrintLabelRequest {
  async getPrintLabelsBodyJson(orderShippingData, myglsAccountId, typeOfPrinter, pickUpAddressId, printPosition = 1, printOrientation) {
    //get mygls settings
    const getMyglsAccountDetails = `{myglsAccount(myglsAccountId:${myglsAccountId}){id,email,password,isDefault,defaultServices{serviceId,myglsAccountId,serviceDetails{id,code,description}}}}`;

    const graphqlQueryResponse = await axios(await GraphQlConfig(getMyglsAccountDetails));

    const myglsAccountDetail = graphqlQueryResponse.data.data.myglsAccount[0];

    const TypeOfPrinter = typeOfPrinter;

    //get pickup details

    const pickupAddress = await MyslqDatabaseConnection.awaitQuery(`select * from pickupaddress where id =${pickUpAddressId}`);

    const pickupAddressBody = this.getPickupAddressBody(pickupAddress[0]);

    //get the default services
    const selectedServiceIds = [];

    myglsAccountDetail.defaultServices.map((a) => {
      selectedServiceIds.push(a.serviceId);
    });

    let ParcelList = [];
    if (printOrientation != 5) {
      //If the request is a Pick and Ship request, then the request body has different parameters
      orderShippingData.map((a) => {
        const deliveryAddress = this.getDeliveryAddressBody(a.ContactPerson);

        let myglsServiceArray = [];
        if (printOrientation == 1 || printOrientation == 2) {
          if (a.ContactPerson.pclshopId) {
            myglsServiceArray.push(myglsServices.PSDBody(a.ContactPerson.pclshopId));
          }
        }

        if (printOrientation == 3) {
          //If the request is an Exchange service request, then the request body has different parameters
          myglsServiceArray.push(myglsServices.XSBody());
        }

        selectedServiceIds.map((serviceId) => {
          (a.ContactPerson.pclshopId && serviceId < 3) || (a.ContactPerson.pclshopId && serviceId == 4) || (printOrientation == 3 && serviceId == 2)
            ? ""
            : myglsServiceArray.push(myglsServices.getServiceBody(serviceId, a.ContactPerson.Email, a.ContactPerson.Phone));
        });

        ParcelList.push(this.getParcelListBoody(a.OrderFinalPrice, a.id, a.parcelCount, deliveryAddress, pickupAddressBody, myglsServiceArray));
      });
    } else {
      let myglsServiceArray = [];
      myglsServiceArray.push(myglsServices.getServiceBody(5));
      selectedServiceIds.map((serviceId) => {
        serviceId < 3 ? "" : myglsServiceArray.push(myglsServices.getServiceBody(serviceId, pickupAddressBody.ContactEmail, pickupAddressBody.ContactPhone));
      });
      const deliveryAddress = this.getDeliveryAddressBody(orderShippingData[0].ContactPerson);
      ParcelList.push(
        this.getParcelListBoody(null, orderShippingData[0].id, orderShippingData[0].parcelCount, pickupAddressBody, deliveryAddress, myglsServiceArray)
      );
    }

    return this.getMainPrintLabelsRequestBody(myglsAccountDetail.email, myglsAccountDetail.password, TypeOfPrinter, ParcelList, printPosition);
  }

  getMainPrintLabelsRequestBody(userName, hashedPassword, typeOfPrinter, parcelList, printPosition = 0) {
    return {
      ClientNumberList: [],
      Password: cryption.hashedPasswordToByteArray(hashedPassword),
      Username: userName,
      ParcelList: parcelList, //Its an array
      PrintPosition: printPosition,
      ShowPrintDialog: false,
      TypeOfPrinter: typeOfPrinter,
    };
  }

  getParcelListBoody(codAmount, orderId, count, deliveryAddressObject, pickupAddressObject, serviceListArray) {
    return {
      CODAmount: codAmount,
      CODCurrency: "",
      CODReference: `OrderID:${orderId}`,
      ClientNumber: 100032943,
      ClientReference: `OrderID:${orderId}`,
      Content: "The content will be here",
      Count: count,
      DeliveryAddress: deliveryAddressObject,
      ParcelNumber: null,
      PickupAddress: pickupAddressObject,
      PickupDate: "/Date(1636070400000+0200)/",
      ServiceList: serviceListArray, //its an array
    };
  }

  getPickupAddressBody(addressObject) {
    return {
      City: addressObject.City,
      ContactEmail: addressObject.Email,
      ContactName: addressObject.ContactName,
      ContactPhone: addressObject.Phone,
      CountryIsoCode: addressObject.Country,
      Name: addressObject.Name,
      Street: addressObject.Address,
      ZipCode: addressObject.ZipCode,
    };
  }
  getDeliveryAddressBody(addressObject) {
    //The delivery address will be different if the addres has been set to a ParcelShop
    if (addressObject.pclshopId) {
      // return { ContactEmail: addressObject.Email, ContactName: addressObject.DeliveryName, ContactPhone: addressObject.Phone };
      return {
        City: "PSDCity",
        ContactEmail: addressObject.Email,
        ContactName: addressObject.DeliveryName,
        ContactPhone: addressObject.Phone,
        CountryIsoCode: addressObject.Country,
        Name: addressObject.DeliveryName,
        Street: "PSDStreet",
        ZipCode: 2351,
      };
    } else {
      return {
        City: addressObject.City,
        ContactEmail: addressObject.Email,
        ContactName: addressObject.DeliveryName,
        ContactPhone: addressObject.Phone,
        CountryIsoCode: addressObject.Country,
        Name: addressObject.DeliveryName,
        Street: addressObject.Address,
        ZipCode: addressObject.ZipCode,
      };
    }
  }
}

module.exports = PrintLabelRequest;
