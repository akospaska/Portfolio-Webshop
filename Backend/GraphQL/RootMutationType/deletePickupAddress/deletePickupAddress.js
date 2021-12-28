const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const deletePickupAddress = {
  type: GraphQLNonNull(sqlInsertType),
  description: "delete  pickupaddress",
  args: {
    pickupAddressId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const insertResult = await MyslqDatabaseConnection.awaitQuery(`delete from pickupAddress where id = ${args.pickupAddressId}`);
    return insertResult;
  },
};

module.exports = deletePickupAddress;
