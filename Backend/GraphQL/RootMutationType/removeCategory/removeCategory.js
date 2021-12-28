const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const removeCategory = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Remove Category",
  args: {
    categoryId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const deleteResult = await MyslqDatabaseConnection.awaitQuery(`delete from category where id = ${args.categoryId}`);
    return deleteResult;
  },
};

module.exports = removeCategory;
