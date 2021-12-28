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
const MyglsDefaultService = require("../MyglsDefaultService/MyglsDefaultService");

const MyglsAccountType = new GraphQLObjectType({
  name: "MyglsAccount",
  description: "This represents a mygls accopunt",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    email: { type: GraphQLNonNull(GraphQLString) },
    clientNumber: { type: GraphQLNonNull(GraphQLInt) },
    password: { type: GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
    typeOfPrinter: { type: GraphQLNonNull(GraphQLString) },
    isDefault: { type: GraphQLNonNull(GraphQLInt) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
    defaultServices: {
      type: new GraphQLList(MyglsDefaultService),
      resolve: async (myglsAccount) => {
        const response = await MyslqDatabaseConnection.awaitQuery(`select * from defaultmyglsservices where myglsaccountId=${myglsAccount.id} `);
        return response;
      },
    },
  }),
});

module.exports = MyglsAccountType;
