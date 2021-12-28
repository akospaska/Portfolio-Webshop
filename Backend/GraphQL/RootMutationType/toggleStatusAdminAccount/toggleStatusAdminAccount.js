const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const toggleStatusAdminAccount = {
  type: GraphQLNonNull(sqlInsertType),
  description: "update category item",
  args: {
    adminAccountId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { adminAccountId } = args;

    const [checkActiveStatus] = await MyslqDatabaseConnection.awaitQuery(`select isActive from account where id = ${adminAccountId}`);

    const newStatus = checkActiveStatus.isActive == 1 ? 0 : 1;

    const insertResult = await MyslqDatabaseConnection.awaitQuery(`update account set isActive=${newStatus} where id=${adminAccountId}`);
    return insertResult;
  },
};

module.exports = toggleStatusAdminAccount;
