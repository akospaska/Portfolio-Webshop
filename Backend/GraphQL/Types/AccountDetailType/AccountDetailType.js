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

const AccountDetailType = new GraphQLObjectType({
  name: "accountDetail",
  description: "This represents a Delivery address of a client's account",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    accountId: { type: GraphQLNonNull(GraphQLInt) },
    deliveryName: { type: GraphQLNonNull(GraphQLString) },
    deliveryCountry: { type: GraphQLNonNull(GraphQLString) },
    deliveryZipCode: { type: GraphQLNonNull(GraphQLString) },
    deliveryCity: { type: GraphQLNonNull(GraphQLString) },
    deliveryStreet: { type: GraphQLNonNull(GraphQLString) },
    deliveryContactEmail: { type: GraphQLNonNull(GraphQLString) },
    deliveryContactPhone: { type: GraphQLNonNull(GraphQLString) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = AccountDetailType;
