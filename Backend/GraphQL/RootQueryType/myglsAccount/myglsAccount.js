const expressGraphQL = require("express-graphql").graphqlHTTP;

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphqlLong,
} = require("graphql");

const MyglsAccountType = require("../../Types/MyglsAccountType/MyglsAccountType");
const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const myglsAccount = {
  type: new GraphQLList(MyglsAccountType),
  description: "list of all mygls accounts",
  args: {
    myglsAccountId: { type: new GraphQLList(GraphQLInt) },
  },
  resolve: async (root, args, context) => {
    const response = await MyslqDatabaseConnection.awaitQuery(
      `select * from myglsaccount ${args.myglsAccountId ? `where id=${args.myglsAccountId}` : ""} order by isdefault desc`
    );

    return await response;
  },
};

module.exports = myglsAccount;
