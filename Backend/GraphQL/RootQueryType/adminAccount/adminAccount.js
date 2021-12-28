const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const adminAccountType = require("../../Types/adminAccountType/adminAccountType");

const adminAccount = {
  type: new GraphQLList(adminAccountType),
  description: "list of all admin accounts ",

  resolve: async (root, args, context) => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from account where groupId=1;`);

    return await response;
  },
};

module.exports = adminAccount;
