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
const MyglsSerivceType = require("../MyglsSerivceType/MyglsSerivceType");

const MyglsDefaultService = new GraphQLObjectType({
  name: "MyglsDefaultService",
  description: "This represents a mygls accopunt's default services",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    serviceId: { type: GraphQLNonNull(GraphQLInt) },
    myglsAccountId: { type: GraphQLNonNull(GraphQLInt) },
    serviceDetails: {
      type: GraphQLNonNull(MyglsSerivceType),
      resolve: async (defaultMyglsService) => {
        const response = await MyslqDatabaseConnection.awaitQuery(`select * from myglsservice where id=${defaultMyglsService.serviceId} `);

        return response[0];
      },
    },
  }),
});

module.exports = MyglsDefaultService;
