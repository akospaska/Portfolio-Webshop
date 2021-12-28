const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList, GraphQLInt } = require("graphql");

const ProductType = require("../../Types/ProductType/ProductType");
const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const productsByByIdList = {
  type: new GraphQLList(ProductType),
  description: "list of all products by id",
  args: { idList: { type: new GraphQLList(GraphQLInt) } },
  resolve: async (parent, args, context) => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from product where id in (${[...args.idList]}) and isDeleted=0`);
    return response;
  },
};

module.exports = productsByByIdList;
