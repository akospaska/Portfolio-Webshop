const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updateOrderContactPerson = {
  type: GraphQLNonNull(sqlInsertType),
  description: "update contactperson by id ",
  args: {
    ContactPersonId: { type: GraphQLNonNull(GraphQLInt) },
    Name: { type: GraphQLNonNull(GraphQLString) },
    Country: { type: GraphQLNonNull(GraphQLString) },
    City: { type: GraphQLNonNull(GraphQLString) },
    ZipCode: { type: GraphQLNonNull(GraphQLString) },
    Address: { type: GraphQLNonNull(GraphQLString) },
    Phone: { type: GraphQLNonNull(GraphQLString) },
    Email: { type: GraphQLNonNull(GraphQLString) },
    pclshopId: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, context) => {
    const { ContactPersonId, Name, Country, ZipCode, Address, Phone, Email, City, pclshopId } = args;

    const queryResult = await MyslqDatabaseConnection.awaitQuery(
      `update contactperson set DeliveryName="${Name}", Country="${Country}", City="${City}" , ZipCode="${ZipCode}", Address="${Address}", Email="${Email}", Phone="${Phone}" ,pclshopId="${pclshopId}" where id = ${ContactPersonId}`
    );
    return queryResult;
  },
};

module.exports = updateOrderContactPerson;
