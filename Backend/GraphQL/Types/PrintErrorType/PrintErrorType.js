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

const PrintErrorType = new GraphQLObjectType({
  name: "printErrors",
  description: "This represents an error by printing",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    ErrorDescription: { type: GraphQLNonNull(GraphQLID) },
    errorCode: { type: GraphQLNonNull(GraphQLInt) },
    orderId: { type: GraphQLNonNull(GraphQLInt) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = PrintErrorType;
