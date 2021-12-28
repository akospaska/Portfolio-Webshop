const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const createNewBrand = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Create new Brand",
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    priceReduce: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const updateResult = await MyslqDatabaseConnection.awaitQuery(`insert into brand (name,priceReduce) values ("${args.name}",${args.priceReduce})`);
    return updateResult;
  },
};

module.exports = createNewBrand;
