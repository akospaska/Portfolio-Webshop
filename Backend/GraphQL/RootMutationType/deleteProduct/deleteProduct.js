const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const deleteProduct = {
  type: GraphQLNonNull(sqlInsertType),
  description: "delete admin account",
  args: {
    productId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { productId } = args;
    const deleteResult = await MyslqDatabaseConnection.awaitQuery(`update  product set isDeleted=1 where id =${productId}`);
    return deleteResult;
  },
};

module.exports = deleteProduct;
