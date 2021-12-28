const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");
const PickupAddressType = require("../../Types/PickupAddressType/PickupAddressType");

const pickupAddress = {
  type: new GraphQLList(PickupAddressType),
  description: "list of all pickup addresses ",

  resolve: async (root, args, context) => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from pickupaddress order by isDefault desc`);

    return await response;
  },
};

module.exports = pickupAddress;
