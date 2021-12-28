const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const StatusType = require("../../Types/StatusType/StatusType");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const status = {
  type: new GraphQLList(StatusType),
  description: "list of all status",

  resolve: async (root, args, context) => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from orderstatusenum;`);

    return response;
  },
};

module.exports = status;
