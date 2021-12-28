const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const Cache = require("../../../Classes/Cache/Cache");

const cache = new Cache();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const deleteBrand = {
  type: GraphQLNonNull(sqlInsertType),
  description: "delete brand item",
  args: {
    brandId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { brandId } = args;

    const insertResult = await MyslqDatabaseConnection.awaitQuery(`delete from  brand  where id=${brandId}`);
    const deleteAllProductsbyBrand = await MyslqDatabaseConnection.awaitQuery(`update product set isdeleted=1 where brandId=${brandId}`);
    cache.CreateCaches();
    return insertResult;
  },
};

module.exports = deleteBrand;
