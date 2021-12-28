const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const deleteMyglsAccount = {
  type: GraphQLNonNull(sqlInsertType),
  description: "update mygls account details",
  args: {
    myglsAccountId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { myglsAccountId } = args;

    const insertResult = await MyslqDatabaseConnection.awaitQuery(`delete from  myglsAccount  where id=${myglsAccountId}`);

    return insertResult;
  },
};

module.exports = deleteMyglsAccount;
