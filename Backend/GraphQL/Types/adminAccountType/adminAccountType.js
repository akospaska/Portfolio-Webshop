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

const adminAccountType = new GraphQLObjectType({
  name: "accountType",
  description: "This represents an account",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    email: { type: GraphQLNonNull(GraphQLString) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
    isActive: { type: GraphQLNonNull(GraphQLInt) },
  }),
});

module.exports = adminAccountType;
