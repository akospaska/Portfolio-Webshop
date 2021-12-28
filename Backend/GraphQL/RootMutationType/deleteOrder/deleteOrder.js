const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const deleteOrder = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Delete Order",
  args: {
    orderId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { orderId } = args;

    const queryResult = await MyslqDatabaseConnection.awaitQuery(`update \`order\` set status = 9 where id =${orderId} `);
    return queryResult;
  },
};

module.exports = deleteOrder;
