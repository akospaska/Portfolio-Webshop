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

const ContactPersonType = new GraphQLObjectType({
  name: "ContactPerson",
  description: "This represents a contactPerson",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    DeliveryName: { type: GraphQLNonNull(GraphQLString) },
    Country: { type: GraphQLNonNull(GraphQLString) },
    ZipCode: { type: GraphQLString },
    City: { type: GraphQLString },
    Address: { type: GraphQLString },
    Email: { type: GraphQLNonNull(GraphQLString) },
    Phone: { type: GraphQLNonNull(GraphQLString) },
    pclshopId: { type: GraphQLString },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
  }),
});

module.exports = ContactPersonType;
