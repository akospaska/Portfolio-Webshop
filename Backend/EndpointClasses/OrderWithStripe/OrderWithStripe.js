const GraphQlConfig = require("../../Backend/Api/GRAPHQL");
const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");
const Cryption = require("../../Classes/Authentication/Cryption");
const ShoppingCart = require("../../Classes/ShoppingCart/ShoppingCart");
const Stripe = require("../../Classes/Stripe/Stripe");
const Order = require("../../Classes/Order/Order");
const axios = require("axios");
const Session = require("../../Classes/Authentication/Session");

const pass = new Cryption();
const shoppingCart = new ShoppingCart();
const stripe = new Stripe();
const order = new Order();
const sessionHandler = new Session();

class OrderWithStripe {
  async orderWithStripe(req, res) {
    //Identify the customer - Is logged in or not, etc.
    const sessionKey = sessionHandler.getCookie(req, res);
    const [identifyClient] = await sessionHandler.getSessionStoredValues(sessionKey);

    //Create a contact Person
    const newContactPersonId = await order.createContactPerson(req.body);

    let getOrdersQuery = `{collectShoppingCartItemsForStripeOrder(accountId:${identifyClient.accountId},sessionKey:"${
      identifyClient.sessionKey ? identifyClient.sessionKey : ""
    }"){itemId,count,finalPrice,name,vat,netPrice,priceReduce}}`;

    //Collect the customer's items from their shopping cart
    const graphQueryResult = await axios(await GraphQlConfig(getOrdersQuery));

    //declare the collected items
    const cartItems = graphQueryResult.data.data.collectShoppingCartItemsForStripeOrder;

    //If the customer could send an order with an empty cart, then an error will be sent.
    if (cartItems.length < 1) {
      res.sendStatus(400);
      return;
    }
    //Try the payment via Stripe
    const paymentIntent = await stripe.checkout(cartItems);

    //insert into the  database the new order
    const insertNewOrderResult = await MyslqDatabaseConnection.awaitQuery(
      `insert into \`order\` (orderRequestConfirmationtSessionKey,accountId,contactPersonId,status,parcelCount,payed,paymentIntentId) values("${sessionKey}",${identifyClient.accountId},${newContactPersonId},2,1,0,"${paymentIntent.payment_intent}") `
    );

    //insert orderitems too
    cartItems.map(async (a) => {
      await MyslqDatabaseConnection.awaitQuery(
        `insert into orderitem (orderId,itemId,count,netPrice,vat,priceReduce) values(${insertNewOrderResult.insertId},${a.itemId},${a.count},${a.netPrice},${a.vat},${a.priceReduce})`
      );
    });

    //Make empty the shopping cart of the customer
    shoppingCart.emptyShoppingCart(sessionKey, identifyClient.accountId);

    //Send back to the frontend the Stripe URL and wait for the WEBHOOK.
    res.send({ url: paymentIntent.url });
  }
}

module.exports = OrderWithStripe;
