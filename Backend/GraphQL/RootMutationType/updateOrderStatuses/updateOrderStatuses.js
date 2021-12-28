const { GraphQLInt, GraphQLNonNull, GraphQLList } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updateOrderStatuses = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Modify orders statuses",
  args: {
    orderIds: { type: new GraphQLList(GraphQLInt) },
    newStatus: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { orderIds, newStatus } = args;

    const queryResult = await MyslqDatabaseConnection.awaitQuery(`update \`order\` set status = ${newStatus} where id in (${[...orderIds]}) `);
    return queryResult;
  },
};

module.exports = updateOrderStatuses;
