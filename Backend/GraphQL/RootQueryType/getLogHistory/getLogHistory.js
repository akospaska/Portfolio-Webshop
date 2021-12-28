const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList, GraphQLInt } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");
const LogHistoryType = require("../../Types/LogHistoryType/LogHistoryType");

const getLogHistory = {
  type: new GraphQLList(LogHistoryType),
  description: "list of all orderId",
  args: {
    orderId: { type: new GraphQLList(GraphQLInt) },
  },
  resolve: async (root, args, context) => {
    let extraQuery = args.orderId ? `where orderId = ${args.orderId}` : "";
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from loghistory ${extraQuery} order by creationdate desc`);

    return await response;
  },
};

module.exports = getLogHistory;
