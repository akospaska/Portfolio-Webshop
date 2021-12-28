const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updatePickUpAddress = {
  type: GraphQLNonNull(sqlInsertType),
  description: "update pickupaddress",
  args: {
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
  },
  resolve: async (parent, args, context) => {
    const { id, Name, Country, City, ZipCode, Address, ContactName, Email, Phone, isDefault } = args;

    const updateResult = await MyslqDatabaseConnection.awaitQuery(
      `update pickupaddress set Name="${Name}",Country="${Country}",City="${City}",ZipCode="${ZipCode}",Address="${Address}",ContactName="${ContactName}",Email="${Email}",Phone="${Phone}",isDefault=${isDefault} where id =${id}`
    );
    return updateResult;
  },
};

module.exports = updatePickUpAddress;
