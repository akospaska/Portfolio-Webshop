const { GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLBoolean } = require("graphql");

const Order = require("../../../Classes/Order/Order");

const order = new Order();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const sendOrder = {
  type: GraphQLNonNull(sqlInsertType),
  description: "send order with address details",
  args: {
    deliveryName: { type: GraphQLNonNull(GraphQLString) },
    deliveryCountry: { type: GraphQLNonNull(GraphQLString) },
    deliveryZipCode: { type: GraphQLNonNull(GraphQLString) },
    deliveryCity: { type: GraphQLNonNull(GraphQLString) },
    deliveryStreet: { type: GraphQLNonNull(GraphQLString) },
    deliveryContactEmail: { type: GraphQLNonNull(GraphQLString) },
    deliveryContactPhone: { type: GraphQLNonNull(GraphQLString) },
    paymentType: { type: GraphQLNonNull(GraphQLInt) },
    toParcelShop: { type: GraphQLNonNull(GraphQLBoolean) },
    selectedParcelShop: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, context) => {
    const updateResult = await order.sendOrder(context.req, context.res, args);
    return updateResult;
  },
};

module.exports = sendOrder;
