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

const MyglsSerivceType = new GraphQLObjectType({
  name: "MyglsService",
  description: "This represents a mygls service",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    code: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = MyglsSerivceType;
