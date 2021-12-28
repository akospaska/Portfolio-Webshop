const expressGraphQL = require("express-graphql").graphqlHTTP;

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphqlLong,
} = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");
const LogHistoryType = require("../LogHistoryType/LogHistoryType");

const LogHistoryIDType = new GraphQLObjectType({
  name: "LogHistoryID",
  description: "This represents a LogHistoryID",
  fields: () => ({
    printactionId: { type: GraphQLNonNull(GraphQLID) },
    logHistory: {
      type: new GraphQLList(LogHistoryType),
      resolve: async (logHistoryID) => {
        const response = await MyslqDatabaseConnection.awaitQuery(
          `select * from loghistory where printactionId=${logHistoryID.printactionId} order by creationDate desc`
        );
        return response;
      },
    },
  }),
});

module.exports = LogHistoryIDType;
