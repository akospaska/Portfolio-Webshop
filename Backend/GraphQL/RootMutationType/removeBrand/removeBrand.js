const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const removeBrand = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Remove Brand",
  args: {
    brandId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const deleteResult = await MyslqDatabaseConnection.awaitQuery(`delete from brand where id = ${args.brandId}`);
    return deleteResult;
  },
};

module.exports = removeBrand;
