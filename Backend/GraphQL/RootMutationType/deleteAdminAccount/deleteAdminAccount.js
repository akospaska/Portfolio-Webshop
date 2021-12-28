const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const deleteAdminAccount = {
  type: GraphQLNonNull(sqlInsertType),
  description: "delete admin account",
  args: {
    adminAccountId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { adminAccountId } = args;
    const insertResult = await MyslqDatabaseConnection.awaitQuery(`delete from account where id =${adminAccountId}`);
    return insertResult;
  },
};

module.exports = deleteAdminAccount;
