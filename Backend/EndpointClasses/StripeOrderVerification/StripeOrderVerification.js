const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");

const GraphQlConfig = require("../../Backend/Api/GRAPHQL");

const EmailTemplates = require("../../Classes/EmailSending/EmailTemplates/EmailTemplates");

const email = new EmailTemplates();

const axios = require("axios");

class StripeOrderVerification {
  async StripeOrderVerification(request, response) {
    const paymentId = request.body.data.object.id;

    const queryResult = await MyslqDatabaseConnection.awaitQuery(`select * from \`order\` where  paymentIntentId="${paymentId}"`);

    await MyslqDatabaseConnection.awaitQuery(`update \`order\` set confirmed=1 , payed=1, status=3 where id =${queryResult[0].id}`);

    const getOrdersQuery = `{collectOrders(orderIds:[${queryResult[0].id}]){ContactPerson{Email,DeliveryName},OrderItems{id,name,brandID,categoryId,finalPrice,count,imgurl,netPrice,vat,priceReduce}}}`;

    const config = await GraphQlConfig(getOrdersQuery);

    const graphqlQueryResponse = await axios(config);

    const { ContactPerson, OrderItems } = graphqlQueryResponse.data.data.collectOrders[0];

    email.sendOrderSummaryEmailTemplate(ContactPerson.Email, OrderItems, ContactPerson.DeliveryName);

    response.sendStatus(200);
  }
}

module.exports = StripeOrderVerification;
