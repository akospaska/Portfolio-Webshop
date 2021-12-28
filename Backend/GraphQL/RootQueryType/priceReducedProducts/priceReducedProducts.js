const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const ProductType = require("../../Types/ProductType/ProductType");

const priceReducedProducts = {
  type: new GraphQLList(ProductType),
  description: "list of all price reduced products",
  resolve: async () => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from product where priceReduce !=0 and isDeleted=0`);
    return response;
  },
};

module.exports = priceReducedProducts;
