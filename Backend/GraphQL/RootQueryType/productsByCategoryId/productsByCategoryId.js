const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList, GraphQLInt } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const ProductType = require("../../Types/ProductType/ProductType");

const productsByCategoryId = {
  type: new GraphQLList(ProductType),
  description: "list of all products by categoryId",
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from product where categoryId =${args.id} and isDeleted=0`);
    return response;
  },
};

module.exports = productsByCategoryId;
