const { GraphQLInt, GraphQLNonNull } = require("graphql");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");
const shoppingCart = new ShoppingCart();

const removeShoppingCartItem = {
  type: GraphQLNonNull(sqlInsertType),
  description: "remove shoppingcartitem",
  args: {
    itemId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const queryResult = await shoppingCart.removeShoppingCartItem(context.req, context.res, args.itemId);
    return queryResult;
  },
};

module.exports = removeShoppingCartItem;
