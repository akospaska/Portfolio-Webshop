const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const Cache = require("../../../Classes/Cache/Cache");

const cache = new Cache();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const createBrand = {
  type: GraphQLNonNull(sqlInsertType),
  description: "create new brand",
  args: {
    brandName: { type: GraphQLNonNull(GraphQLString) },
    priceReduce: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { brandName, priceReduce } = args;
    const insertResult = await MyslqDatabaseConnection.awaitQuery(`insert into brand(name,priceReduce) values("${brandName}",${priceReduce})`);
    cache.CreateCaches();
    return insertResult;
  },
};

module.exports = createBrand;
