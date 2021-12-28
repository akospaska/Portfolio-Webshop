const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const BrandType = require("../../Types/BrandType/BrandType");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const brands = {
  type: new GraphQLList(BrandType),
  description: "list of all brands",
  resolve: async () => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from brand`);
    return response;
  },
};

module.exports = brands;
