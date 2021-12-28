const { GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLFloat } = require("graphql");

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const updateProduct = {
  type: GraphQLNonNull(sqlInsertType),
  description: "update product details",
  args: {
    productId: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    netPrice: { type: GraphQLNonNull(GraphQLFloat) },
    vat: { type: GraphQLNonNull(GraphQLFloat) },
    priceReduce: { type: GraphQLNonNull(GraphQLFloat) },
    isFeatured: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const { productId, name, netPrice, vat, isFeatured, priceReduce } = args;

    const insertResult = await MyslqDatabaseConnection.awaitQuery(
      `update product set name="${name}",netPrice=${netPrice},vat=${vat},priceReduce=${priceReduce},isFeatured=${isFeatured} where id=${productId}`
    );

    return insertResult;
  },
};

module.exports = updateProduct;
