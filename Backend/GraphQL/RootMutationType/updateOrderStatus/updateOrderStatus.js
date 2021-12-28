const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updateOrderStatus = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Modify order status",
  args: {
    orderId: { type: GraphQLNonNull(GraphQLInt) },
    newStatus: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { orderId, newStatus } = args;

    const queryResult = await MyslqDatabaseConnection.awaitQuery(`update \`order\` set status = ${newStatus} where id =${orderId} `);
    return queryResult;
  },
};

module.exports = updateOrderStatus;
