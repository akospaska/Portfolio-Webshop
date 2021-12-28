const axios = require("axios");

const Session = require("../Authentication/Session");
const Crypto = require("../Authentication/Cryption");
const ShoppingCart = require("../ShoppingCart/ShoppingCart");

const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");
const GetOrderConfirmationTemplate = require("../../src/exportEmailTemplates/GetOrderConfirmationTemplate");
const EmailTemplates = require("../EmailSending/EmailTemplates/EmailTemplates");
const Stripe = require("../Stripe/Stripe");

const email = new EmailTemplates();
const crypto = new Crypto();
const SessionHandler = new Session();
const Cart = new ShoppingCart();
const stripe = new Stripe();

const GraphQlConfig = require("../../Backend/Api/GRAPHQL");
const { status, redirect } = require("express/lib/response");

class Order {
  async createContactPerson(contactPersonObject) {
    const {
      deliveryName,
      deliveryCountry,
      deliveryZipCode,
      deliveryCity,
      deliveryStreet,
      deliveryContactEmail,
      deliveryContactPhone,
      toParcelShop,
      selectedParcelShop,
    } = contactPersonObject;

    //If the customer has been ordered the products to a parcelshop, the contactperson record will contains the ParcelShop unique ID
    //If the selectedParcelShop is null, the order will have a "normal" delivery address.
    let insertQueryResult = toParcelShop
      ? `insert into contactPerson (DeliveryName,Country,Email,Phone,pclshopId) values("${deliveryName}","${deliveryCountry}","${deliveryContactEmail}","${deliveryContactPhone}","${selectedParcelShop}") `
      : `insert into contactPerson (DeliveryName,Country,City,ZipCode,Address,Email,Phone) values("${deliveryName}","${deliveryCountry}","${deliveryCity}","${deliveryZipCode}","${deliveryStreet}","${deliveryContactEmail}","${deliveryContactPhone}") `;

    const insertResult = await MyslqDatabaseConnection.awaitQuery(insertQueryResult);
    return await insertResult.insertId;
  }

  async insertOrder(sessionKey, accountId, contactPersonId, paymentType, paymentIntentId) {
    let statusQuery;
    if (paymentType == 1) {
      accountId == 0 ? (statusQuery = { confirmed: 0, status: 2, payed: 0 }) : (statusQuery = { confirmed: 1, status: 2, payed: 0 });
    } //BANK TRANSFER
    if (paymentType == 2) {
      console.log("i am in 2");
      accountId == 0 ? (statusQuery = { confirmed: 0, status: 3, payed: 0 }) : (statusQuery = { confirmed: 1, status: 3, payed: 0 });
    } //COD
    if (paymentType == 3) {
      console.log("i am in 3");
      statusQuery = { confirmed: 1, status: 3, payed: 1 };
    } //PAYED BY STRIPE //CONFIRMED READY TO PRINT

    console.log(statusQuery);

    console.log(
      `insert into \`order\` (orderRequestConfirmationtSessionKey,accountId,confirmed,contactPersonId,status,payed) values("${sessionKey}",${accountId},${statusQuery.confirmed},${contactPersonId},${statusQuery.status},${statusQuery.payed})`
    );

    const insertResult = await MyslqDatabaseConnection.awaitQuery(
      `insert into \`order\` (orderRequestConfirmationtSessionKey,accountId,confirmed,contactPersonId,status,payed) values("${sessionKey}",${accountId},${statusQuery.confirmed},${contactPersonId},${statusQuery.status},${statusQuery.payed})`
    );
    return insertResult.insertId;
  }

  async insertOrderItem(itemId, count, newOrderId, netPrice, vat, priceReduce) {
    const insertResult = await MyslqDatabaseConnection.awaitQuery(
      `insert into orderitem (orderId,itemId,count,netPrice,vat,priceReduce) values(${newOrderId},${itemId},${count},${netPrice},${vat},${priceReduce})`
    );
    return insertResult.insertId;
  }

  async sendOrder(req, res, args) {
    try {
      const sessionKey = SessionHandler.getCookie(req, res);
      const [identifyClient] = await SessionHandler.getSessionStoredValues(sessionKey);

      const newContactPersonId = await this.createContactPerson(args);

      const newOrderSessionKey = crypto.generateRandomHash();

      const collectOrderItems = await Cart.collectShoppingCartItems(req, res);

      const newOrderId = await this.insertOrder(newOrderSessionKey, identifyClient.accountId, newContactPersonId, args.paymentType);

      collectOrderItems.map(async (a) => {
        await this.insertOrderItem(a.itemId, a.count, newOrderId, a.netPrice, a.vat, a.priceReduce);
      });

      const orderItems = await this.collectOrderItemsWithFinalPrice(newOrderId);

      //if user have a registered account send the orderSummary
      if (identifyClient.accountId > 0) {
        const sendEmailResult = await email.sendOrderSummaryEmailTemplate(args.deliveryContactEmail, orderItems, args.deliveryName, newOrderId);
      }

      //If the cliend didn't registered then send the 1. email of the order verification
      if (identifyClient.accountId == 0) {
        const sendEmailResult = await email.sendOrderVerificationEmailTemplate(
          args.deliveryContactEmail,
          newOrderSessionKey,
          orderItems,
          args.deliveryName,
          newOrderId
        );
      }

      const clearShoppingCart = await Cart.emptyShoppingCart(sessionKey, identifyClient.accountId);

      //sendemail

      return await clearShoppingCart;
    } catch (error) {
      return false; //it should be a status or something
    }
  }
  async modifyConfirmedStatusByOrderId(sessionKey, orderId) {
    const updateResult = MyslqDatabaseConnection.awaitQuery(
      `update \`order\` set confirmed = 1 where orderRequestConfirmationtSessionKey="${sessionKey}" and id = ${orderId}`
    );
    return await updateResult;
  }

  async getContactPerson(sessionKey, orderId) {
    const [queryResult] = await MyslqDatabaseConnection.awaitQuery(
      `select cp.* from \`order\` o join contactPerson cp on cp.id = o.contactPersonId where o.orderRequestConfirmationtSessionKey="${sessionKey}" and o.id=${orderId}`
    );
    return await queryResult;
  }

  async collectOrderItemsWithFinalPrice(orderId) {
    const queryResult = await MyslqDatabaseConnection.awaitQuery(
      `select oi.count,oi.netPrice,oi.vat,oi.priceReduce,p.name,p.imgurl,p.isFeatured , p.brandID, p.categoryId from orderitem oi join product p on p.id = oi.itemId where oi.orderId = ${orderId}`
    );
    return await queryResult;
  }

  async getOrdersForGraphql(req, res, args) {
    //Two paths are avalaible
    //Collect orders specified by accountId =>for client request
    //Collect orders for admin user =>for admin request

    let orderIdQuery;
    let nameQuery;
    let zipCodeQuery;
    let statusQuery;

    args.name ? (nameQuery = `and cp.DeliveryName like ("%${args.name}%")`) : (nameQuery = "");
    args.orderId ? (orderIdQuery = `and o.id=${args.orderId}`) : (orderIdQuery = "");
    args.zipCode ? (zipCodeQuery = `and cp.ZipCode like("%${args.zipCode}%")`) : (zipCodeQuery = "");
    args.status ? (statusQuery = `and o.status=${args.status}`) : (statusQuery = "");

    const sessionKey = SessionHandler.getCookie(req, res);
    const [identifyClient] = await SessionHandler.getSessionStoredValues(sessionKey);

    if (identifyClient.groupId == 2) {
      const response = await MyslqDatabaseConnection.awaitQuery(
        `select o.* from \`order\` o join contactPerson cp on cp.id = o.contactPersonId where confirmed=1  and accountId=${identifyClient.accountId} ${statusQuery} ${zipCodeQuery} ${orderIdQuery} ${nameQuery}`
      );

      return await response;
    } else {
      const response = await MyslqDatabaseConnection.awaitQuery(
        `select o.* from \`order\` o join contactPerson cp on cp.id = o.contactPersonId where confirmed=1 ${statusQuery} ${zipCodeQuery} ${orderIdQuery} ${nameQuery}`
      );

      return response;
    }
  }

  //FOR GRAPHQL
  async getorderDataForLabelPrinting(args) {
    /*    const [identifyRequest] = await SessionHandler.getSessionStoredValues(args.requestKey);

    if (!identifyRequest.groupId == 1) return; */

    const response = await MyslqDatabaseConnection.awaitQuery(
      `select id,accountId,parcelCount,creationDate,contactPersonId,done,status,payed from \`order\` where confirmed=1 and id in (${[...args.orderIds]})`
    );

    return await response;
  }

  async collectOrderDetails(orderIdArray) {
    const getOrdersQuery = `{collectOrders(orderIds:[${[
      ...orderIdArray,
    ]}]){OrderFinalPrice,payed,creationDate,status,id,accountId,parcelCount,creationDate,status,statusDescription,ContactPerson{DeliveryName,pclshopId,Country,ZipCode,City,ZipCode,Address,Email,Phone} OrderItems{name,brandID,categoryId,imgurl,category{name},count,netPrice,vat,finalPrice,priceReduce}}}`;

    const config = await GraphQlConfig(getOrdersQuery);

    const graphqlQueryResponse = await axios(config);

    const collectedOrders = graphqlQueryResponse.data.data.collectOrders;

    return await collectedOrders;
  }

  async setOrderStatusByIdArray(orderIdArray, status) {
    await MyslqDatabaseConnection.awaitQuery(`update \`order\` set status = ${status} where id in (${[...orderIdArray]})`);
  }
}
module.exports = Order;

/*


create contactPerson



create order with contactpersonid

decide is it logged or not 

insert orderitem into orderitem with orderId

send email confirmation
*/
