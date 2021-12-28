const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const ProductType = require("../../Types/ProductType/ProductType");

const products = {
  type: new GraphQLList(ProductType),
  description: "list of all products",
  resolve: async (root, args, context) => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from product where isDeleted=0`);

    return response;
  },
};

module.exports = products;
