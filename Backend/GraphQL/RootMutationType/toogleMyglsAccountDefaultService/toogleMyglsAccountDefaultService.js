const { GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const toogleMyglsAccountDefaultService = {
  type: GraphQLNonNull(sqlInsertType),
  description: "toogle MyglsAccount DefaultService",
  args: {
    myglsAccountId: { type: GraphQLNonNull(GraphQLInt) },
    serviceId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { myglsAccountId, serviceId } = args;

    const serviceStatusChecker = await MyslqDatabaseConnection.awaitQuery(
      `select * from defaultmyglsservices where myglsaccountId=${myglsAccountId} and serviceId=${serviceId}`
    );

    let toggleQuery;
    serviceStatusChecker.length == 0
      ? (toggleQuery = `insert into defaultmyglsservices (myglsAccountId,serviceId) values(${myglsAccountId},${serviceId})`)
      : (toggleQuery = `delete from defaultmyglsservices where myglsAccountId=${myglsAccountId} and serviceId=${serviceId}`);

    const toggleResult = await MyslqDatabaseConnection.awaitQuery(toggleQuery);

    return toggleResult;
  },
};

module.exports = toogleMyglsAccountDefaultService;
