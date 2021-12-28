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

const PickupAddressType = new GraphQLObjectType({
  name: "PickupAddress",
  description: "This represents a pickupaddress",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    Name: { type: GraphQLNonNull(GraphQLString) },
    Country: { type: GraphQLNonNull(GraphQLString) },
    City: { type: GraphQLNonNull(GraphQLString) },
    ZipCode: { type: GraphQLNonNull(GraphQLString) },
    Address: { type: GraphQLNonNull(GraphQLString) },
    ContactName: { type: GraphQLNonNull(GraphQLString) },
    Email: { type: GraphQLNonNull(GraphQLString) },
    Phone: { type: GraphQLNonNull(GraphQLString) },
    isDefault: { type: GraphQLNonNull(GraphQLInt) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = PickupAddressType;
