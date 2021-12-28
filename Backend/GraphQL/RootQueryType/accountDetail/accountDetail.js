const expressGraphQL = require("express-graphql").graphqlHTTP;

const AccountSQLclass = require("../../../Classes/Account/AccountSQLclass");

const accQuery = new AccountSQLclass();

const AccountDetailType = require("../../Types/AccountDetailType/AccountDetailType");

const accountDetail = {
  type: AccountDetailType,
  description: "list of account Delivery Address",
  resolve: async (root, args, context) => {
    const accountDetail = accQuery.getAccountdetails(context.req, context.res);
    //  const [response] = await MyslqDatabaseConnection.awaitQuery(`select * from accountDetail `);
    return accountDetail;
  },
};

module.exports = accountDetail;
