const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLString, GraphQLList, GraphQLInt } = require("graphql");

const Order = require("../../../Classes/Order/Order");

const order = new Order();

const OrderType = require("../../Types/OrderType/OrderType");

const orders = {
  type: new GraphQLList(OrderType),
  description: "list of all orders",
  args: {
    status: { type: GraphQLInt },
    name: { type: GraphQLString },
    orderId: { type: GraphQLInt },
    zipCode: { type: GraphQLString },
  },
  resolve: async (root, args, context) => {
    const response = await order.getOrdersForGraphql(context.req, context.res, args);

    return await response;
  },
};

module.exports = orders;
