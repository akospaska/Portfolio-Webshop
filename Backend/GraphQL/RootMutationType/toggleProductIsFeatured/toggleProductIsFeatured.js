const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const toggleProductIsFeatured = {
  type: GraphQLNonNull(sqlInsertType),
  description: "toggle product isFeatured",
  args: {
    productId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { productId } = args;

    const [checkIsFeaturedStatus] = await MyslqDatabaseConnection.awaitQuery(`select isFeatured from product where id = ${productId}`);

    const newStatus = checkIsFeaturedStatus.isActive == 1 ? 0 : 1;

    const updateResult = await MyslqDatabaseConnection.awaitQuery(`update product set isFeatured=${newStatus} where id=${productId}`);
    return updateResult;
  },
};

module.exports = toggleProductIsFeatured;
