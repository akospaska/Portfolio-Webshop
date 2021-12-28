const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");
const ProductType = require("../../Types/ProductType/ProductType");

const featuredProducts = {
  type: new GraphQLList(ProductType),
  description: "list of all featured products",
  resolve: async () => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from product where isFeatured =1 and isDeleted=0`);
    console.log(response);
    return response;
  },
};

module.exports = featuredProducts;
