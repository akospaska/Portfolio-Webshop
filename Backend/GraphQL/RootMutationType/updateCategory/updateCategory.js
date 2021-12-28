const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const Cache = require("../../../Classes/Cache/Cache");

const cache = new Cache();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updateCategory = {
  type: GraphQLNonNull(sqlInsertType),
  description: "update category item",
  args: {
    categoryId: { type: GraphQLNonNull(GraphQLInt) },
    categoryName: { type: GraphQLNonNull(GraphQLString) },
    priceReduce: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { categoryId, categoryName, priceReduce } = args;
    const insertResult = await MyslqDatabaseConnection.awaitQuery(
      `update category set name="${categoryName}", priceReduce=${priceReduce} where id=${categoryId}`
    );
    cache.CreateCaches();
    return insertResult;
  },
};

module.exports = updateCategory;
