const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList, GraphQLInt } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const LogHistoryIDType = require("../../Types/LogHistoryIDType/LogHistoryIDType");

const getPrintActionHistory = {
  type: new GraphQLList(LogHistoryIDType),
  description: "list of all orderId",
  args: {
    orderId: { type: new GraphQLList(GraphQLInt) },
  },

  resolve: async (root, args, context) => {
    let query = args.orderId
      ? `select printactionId from loghistory where orderId=${args.orderId} limit 20`
      : `select printactionId from loghistory lh group by printactionId order by creationdate desc limit 20`;

    const response = await MyslqDatabaseConnection.awaitQuery(query);

    return await response;
  },
};

module.exports = getPrintActionHistory;
