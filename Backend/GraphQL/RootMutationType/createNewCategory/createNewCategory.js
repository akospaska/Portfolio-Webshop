const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const createNewCategory = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Create new Category",
  args: {
    name: { type: GraphQLNonNull(GraphQLString) },
    priceReduce: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const updateResult = await MyslqDatabaseConnection.awaitQuery(`insert into category (name,priceReduce) values ("${args.name}",${args.priceReduce})`);
    return updateResult;
  },
};

module.exports = createNewCategory;
