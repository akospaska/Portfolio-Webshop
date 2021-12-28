const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const Cache = require("../../../Classes/Cache/Cache");

const cache = new Cache();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const deleteCategory = {
  type: GraphQLNonNull(sqlInsertType),
  description: "delete category item",
  args: {
    categoryId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { categoryId } = args;
    const insertResult = await MyslqDatabaseConnection.awaitQuery(`delete from  category  where id=${categoryId}`);
    const deleteProductsByCategory = await MyslqDatabaseConnection.awaitQuery(`update product set isdeleted=1 where categoryId=${categoryId}`);
    cache.CreateCaches();
    return insertResult;
  },
};

module.exports = deleteCategory;
