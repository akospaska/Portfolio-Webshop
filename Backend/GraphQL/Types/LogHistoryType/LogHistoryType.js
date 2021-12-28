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
const PrintErrorType = require("../PrintErrorType/PrintErrorType");

const PrintedLabelsType = require("../PrintedLabelsType/PrintedLabelsType");

const LogHistoryType = new GraphQLObjectType({
  name: "logHistory",
  description: "This represents a product with brand name",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    printactionId: { type: GraphQLNonNull(GraphQLID) },
    orderId: { type: GraphQLNonNull(GraphQLInt) },
    brandID: { type: GraphQLNonNull(GraphQLInt) },
    successful: { type: GraphQLNonNull(GraphQLInt) },

    printedLabels: {
      type: new GraphQLList(PrintedLabelsType),
      resolve: async (loghistory) => {
        if (loghistory.successful == 0) {
          return;
        }

        const sqlQueryResult = await MyslqDatabaseConnection.awaitQuery(
          `select * from printedlabels where orderId=${loghistory.orderId} order by creationDate desc`
        );

        return await sqlQueryResult;
      },
    },
    printErrors: {
      type: new GraphQLList(PrintErrorType),
      resolve: async (printError) => {
        const sqlQueryResult = await MyslqDatabaseConnection.awaitQuery(`select * from printerrorlist where orderId=${printError.orderId}`);

        return await sqlQueryResult;
      },
    },
  }),
});

module.exports = LogHistoryType;
