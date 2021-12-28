const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLString, GraphQLList, GraphQLInt } = require("graphql");

const ProductType = require("../../Types/ProductType/ProductType");
const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const searchProduct = {
  type: new GraphQLList(ProductType),
  description: "list of all products by id",
  args: {
    name: { type: GraphQLString },
    categoryList: { type: new GraphQLList(GraphQLInt) },
    brandList: { type: new GraphQLList(GraphQLInt) },
  },

  resolve: async (parent, args, context) => {
    const { name, categoryList, brandList } = args;

    const nameQuery = name == "" ? `name !=""` : `name like ("%${name}%")`;
    const categoryQuery = categoryList.length > 0 ? `and categoryId in (${[...categoryList]})` : "";
    const brandQuery = brandList.length > 0 ? `and brandID in (${[...brandList]})` : "";

    const response = await MyslqDatabaseConnection.awaitQuery(`select * from product where ${nameQuery} ${categoryQuery} ${brandQuery} and isDeleted=0`);
    return response;
  },
};

module.exports = searchProduct;
