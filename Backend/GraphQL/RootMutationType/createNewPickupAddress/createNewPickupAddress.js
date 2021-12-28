const { GraphQLString, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const createNewPickupAddress = {
  type: GraphQLNonNull(sqlInsertType),
  description: "create new pickupaddress",
  args: {
    Name: { type: GraphQLNonNull(GraphQLString) },
    Country: { type: GraphQLNonNull(GraphQLString) },
    City: { type: GraphQLNonNull(GraphQLString) },
    ZipCode: { type: GraphQLNonNull(GraphQLString) },
    Address: { type: GraphQLNonNull(GraphQLString) },
    ContactName: { type: GraphQLNonNull(GraphQLString) },
    Email: { type: GraphQLNonNull(GraphQLString) },
    Phone: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, context) => {
    const { Name, Country, City, ZipCode, Address, ContactName, Email, Phone } = args;

    const insertResult = await MyslqDatabaseConnection.awaitQuery(
      `insert into pickupaddress (Name,Country,ZipCode,City,Address,ContactName,Email,Phone) values("${Name}","${Country}","${ZipCode}","${City}","${Address}","${ContactName}","${Email}","${Phone}") `
    );
    return insertResult;
  },
};

module.exports = createNewPickupAddress;
