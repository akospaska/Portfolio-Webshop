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

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const Order = require("../../../Classes/Order/Order");
const AccountSQLclass = require("../../../Classes/Account/AccountSQLclass");
const Cryption = require("../../../Classes/Authentication/Cryption");
const Cache = require("../../../Classes/Cache/Cache");

const accQuery = new AccountSQLclass();

const order = new Order();

const cache = new Cache();

const pass = new Cryption();

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const createNewMyglsAccount = {
  type: GraphQLNonNull(sqlInsertType),
  description: "create new mygls account",
  args: {
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    clientNumber: { type: GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
    typeOfPrinter: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, context) => {
    const { email, password, clientNumber, country, typeOfPrinter } = args;

    const insertResult = await MyslqDatabaseConnection.awaitQuery(
      `insert into myglsaccount (email,password,clientNumber,country,typeOfPrinter) values("${email}","${pass.passwordToSHA512(
        password
      )}",${clientNumber},"${country}","${typeOfPrinter}")`
    );
    return insertResult;
  },
};

module.exports = createNewMyglsAccount;
