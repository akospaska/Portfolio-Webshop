const { GraphQLString, GraphQLInt, GraphQLNonNull } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const modifyParcelCountByOrder = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Modify the parcellabel by orders ",
  args: {
    direction: { type: GraphQLNonNull(GraphQLString) },
    orderId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { direction, orderId } = args;

    let changeValue;

    direction == "+" ? (changeValue = 1) : (changeValue = -1);

    const queryResult = await MyslqDatabaseConnection.awaitQuery(`update \`order\` set parcelCount = parcelCount+${changeValue} where id =${orderId} `);
    return queryResult;
  },
};

module.exports = modifyParcelCountByOrder;
