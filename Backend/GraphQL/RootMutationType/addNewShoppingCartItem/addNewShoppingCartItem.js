const { GraphQLInt, GraphQLNonNull } = require("graphql");

const sqlInsertType = require("../../Types/sqlInsertType/sqlInsertType");

const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");
const shoppingCart = new ShoppingCart();

const addNewShoppingCartItem = {
  type: GraphQLNonNull(sqlInsertType),
  description: "Add a new shoppingcartitem",
  args: {
    itemId: { type: GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (parent, args, context) => {
    const queryResult = await shoppingCart.addNewShoppingCartItem(context.req, context.res, args.itemId);

    return queryResult;
  },
};

module.exports = addNewShoppingCartItem;
