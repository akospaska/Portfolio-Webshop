const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updateMyglsAccount = {
  type: GraphQLNonNull(sqlInsertType),
  description: "update mygls account details",
  args: {
    myglsAccountId: { type: GraphQLNonNull(GraphQLInt) },
    email: { type: GraphQLNonNull(GraphQLString) },
    clientNumber: { type: GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
    typeOfPrinter: { type: GraphQLNonNull(GraphQLString) },
    isDefault: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { myglsAccountId, email, clientNumber, country, typeOfPrinter, isDefault } = args;

    const insertResult = await MyslqDatabaseConnection.awaitQuery(
      `update myglsAccount set email="${email}", clientNumber=${clientNumber},country="${country}" ,typeOfPrinter="${typeOfPrinter}", isDefault=${isDefault} where id=${myglsAccountId}`
    );

    return insertResult;
  },
};

module.exports = updateMyglsAccount;
