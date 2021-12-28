const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList, GraphQLInt } = require("graphql");

const Order = require("../../../Classes/Order/Order");

const order = new Order();

const OrderType = require("../../Types/OrderType/OrderType");

const collectOrders = {
  type: new GraphQLList(OrderType),
  description: "list of all orders",
  args: {
    orderIds: { type: new GraphQLList(GraphQLInt) },
  },
  resolve: async (root, args, context) => {
    const response = await order.getorderDataForLabelPrinting(args);

    return await response;
  },
};

module.exports = collectOrders;
