const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const CategoryType = require("../../Types/CategoryType/CategoryType");
const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const categories = {
  type: new GraphQLList(CategoryType),
  description: "list of all categories",
  resolve: async () => {
    const response = await MyslqDatabaseConnection.awaitQuery(`select * from category`);
    return response;
  },
};

module.exports = categories;
