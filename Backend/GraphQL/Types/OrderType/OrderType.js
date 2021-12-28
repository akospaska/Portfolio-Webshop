const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull, GraphQLFloat } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const ContactPersonType = require("../ContactPersonType/ContactPersonType");

const OrderItemType = require("../OrderItemType/OrderItemType");

const LogHistoryType = require("../LogHistoryType/LogHistoryType");

const Cache = require("../../../Classes/Cache/Cache");
const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");

const cache = new Cache();
const shoppingCart = new ShoppingCart();

const OrderType = new GraphQLObjectType({
  name: "Order",
  description: "This represents an order",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    accountId: { type: GraphQLNonNull(GraphQLInt) },
    contactPersonId: { type: GraphQLNonNull(GraphQLInt) },
    done: { type: GraphQLNonNull(GraphQLInt) },
    status: { type: GraphQLNonNull(GraphQLInt) },
    parcelCount: { type: GraphQLNonNull(GraphQLInt) },
    payed: { type: GraphQLInt },

    statusDescription: {
      type: GraphQLNonNull(GraphQLString),
      resolve: async (order) => {
        const response = await MyslqDatabaseConnection.awaitQuery(`select * from orderStatusEnum where id = ${order.status}`);
        return response[0].description;
      },
    },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
    ContactPerson: {
      type: GraphQLNonNull(ContactPersonType),
      resolve: async (order) => {
        const response = await MyslqDatabaseConnection.awaitQuery(
          `select cp.* from contactperson cp join \`order\` o on o.contactpersonId = cp.id where o.id=${order.id} and o.confirmed=1`
        );

        return response[0];
      },
    },
    OrderItems: {
      type: new GraphQLList(OrderItemType),
      resolve: async (order) => {
        const response = await MyslqDatabaseConnection.awaitQuery(
          `select p.id, p.name,p.categoryId,p.brandID,p.imgurl,p.isFeatured,oi.netPrice,oi.vat,oi.priceReduce,oi.count from orderitem oi join product p on p.id = oi.itemId where oi.orderId=${order.id} `
        );
        return response;
      },
    },
    OrderFinalPrice: {
      type: GraphQLNonNull(GraphQLFloat),
      resolve: async (order) => {
        console.log();

        const response = await MyslqDatabaseConnection.awaitQuery(
          `select oi.itemId as id, oi.count,oi.netPrice,oi.vat,oi.pricereduce,p.brandID,p.categoryId from\`order\` o join orderitem oi on oi.orderId=o.id  join product p on p.id = oi.itemId where o.id=${order.id} `
        );

        let orderFinalPrice = 0;

        response.map((a) => {
          const brandPriceReduce = cache.getBrandPriceReducedValues().find((item) => item.id == a.brandID).priceReduce;

          const categoryPriceReduce = cache.getCategoryPriceReducedValues().find((item) => item.id == a.categoryId).priceReduce;

          const finalProductPrice = shoppingCart.calculateFinalPrice(a.pricereduce, a.netPrice, a.vat, brandPriceReduce, categoryPriceReduce);

          orderFinalPrice = orderFinalPrice + a.count * Number(finalProductPrice);
        });

        return Number(orderFinalPrice.toFixed(2));
      },
    },
    LogHistory: {
      type: new GraphQLList(LogHistoryType),
      resolve: async (order) => {
        const response = await MyslqDatabaseConnection.awaitQuery(`select * from loghistory where orderId=${order.id} order by creationDate desc`);
        return response;
      },
    },
  }),
});

module.exports = OrderType;
