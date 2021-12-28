const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const Cache = require("../../../Classes/Cache/Cache");

const cache = new Cache();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updateBrand = {
  type: GraphQLNonNull(sqlInsertType),
  description: "delete brand item",
  args: {
    brandId: { type: GraphQLNonNull(GraphQLInt) },
    brandName: { type: GraphQLNonNull(GraphQLString) },
    priceReduce: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { brandId, brandName, priceReduce } = args;
    const insertResult = await MyslqDatabaseConnection.awaitQuery(`update brand set name="${brandName}", priceReduce=${priceReduce} where id=${brandId}`);
    cache.CreateCaches();
    return insertResult;
  },
};

module.exports = updateBrand;
