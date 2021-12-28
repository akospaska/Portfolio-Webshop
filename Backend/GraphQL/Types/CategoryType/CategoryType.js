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

const CategoryType = new GraphQLObjectType({
  name: "Category",
  description: "This represents a Category with name",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    priceReduce: { type: GraphQLNonNull(GraphQLFloat) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },

    count: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: async (category) => {
        try {
          const response = await MyslqDatabaseConnection.awaitQuery(
            `select count(*) as count from product where categoryId=${category.id} group by categoryId `
          );
          return response[0].count;
        } catch (error) {
          return 0;
        }
      },
    },
  }),
});

module.exports = CategoryType;
