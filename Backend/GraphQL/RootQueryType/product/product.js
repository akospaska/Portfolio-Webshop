const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList, GraphQLInt } = require("graphql");

const ProductType = require("../../Types/ProductType/ProductType");
const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const product = {
  type: new GraphQLList(ProductType),
  description: "list of all products",
  args: {
    id: { type: GraphQLInt },
  },
  resolve: async (parent, args) => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from product where id =${args.id} and isDeleted=0`);
    return response;
  },
};

module.exports = product;
