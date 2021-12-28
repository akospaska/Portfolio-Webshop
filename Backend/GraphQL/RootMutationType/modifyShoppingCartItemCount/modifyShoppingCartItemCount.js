const { GraphQLInt, GraphQLNonNull, GraphQLString } = require("graphql");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");
const shoppingCart = new ShoppingCart();

const modifyShoppingCartItemCount = {
  type: GraphQLNonNull(sqlInsertType),
  description: "remove shoppingcartitem",
  args: {
    itemId: { type: GraphQLNonNull(GraphQLInt) },
    direction: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve: async (parent, args, context) => {
    const queryResult = await shoppingCart.modifyShoppingCartItemCount(context.req, context.res, args.itemId, args.direction);
    return queryResult;
  },
};

module.exports = modifyShoppingCartItemCount;
