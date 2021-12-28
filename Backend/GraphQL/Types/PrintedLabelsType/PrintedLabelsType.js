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

const PrintedLabelsType = new GraphQLObjectType({
  name: "printedLabels",
  description: "This represents a printed label",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    parcelnumber: { type: GraphQLNonNull(GraphQLID) },
    parcelId: { type: GraphQLNonNull(GraphQLInt) },
    orderId: { type: GraphQLNonNull(GraphQLInt) },
    printOrientation: { type: GraphQLNonNull(GraphQLInt) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = PrintedLabelsType;
