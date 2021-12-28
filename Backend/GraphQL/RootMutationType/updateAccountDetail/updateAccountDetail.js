const { GraphQLString, GraphQLNonNull } = require("graphql");

const AccountSQLclass = require("../../../Classes/Account/AccountSQLclass");

const accQuery = new AccountSQLclass();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updateAccountDetail = {
  type: GraphQLNonNull(sqlInsertType),
  description: "update delivery account details",
  args: {
    deliveryName: { type: GraphQLNonNull(GraphQLString) },
    deliveryCountry: { type: GraphQLNonNull(GraphQLString) },
    deliveryZipCode: { type: GraphQLNonNull(GraphQLString) },
    deliveryCity: { type: GraphQLNonNull(GraphQLString) },
    deliveryStreet: { type: GraphQLNonNull(GraphQLString) },
    deliveryContactEmail: { type: GraphQLNonNull(GraphQLString) },
    deliveryContactPhone: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, context) => {
    const updateResult = await accQuery.clientAccountDetailsUpdate(context.req, context.res, args);
    return updateResult;
  },
};

module.exports = updateAccountDetail;
