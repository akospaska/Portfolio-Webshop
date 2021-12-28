const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const Cache = require("../../../Classes/Cache/Cache");

const cache = new Cache();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const createCategory = {
  type: GraphQLNonNull(sqlInsertType),
  description: "create new category",
  args: {
    categoryName: { type: GraphQLNonNull(GraphQLString) },
    priceReduce: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { categoryName, priceReduce } = args;
    const insertResult = await MyslqDatabaseConnection.awaitQuery(`insert into category(name,priceReduce) values("${categoryName}",${priceReduce})`);
    cache.CreateCaches();
    return insertResult;
  },
};

module.exports = createCategory;
