const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLList } = require("graphql");

const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");
const shoppingCart = new ShoppingCart();
const ShoppingCartType = require("../../Types/ShoppingCartType/ShoppingCartType");

const shoppingCartItems = {
  type: new GraphQLList(ShoppingCartType),
  description: "list of all products in the shopping cart based on the sessionvalue or accountId",

  resolve: async (root, args, context) => {
    return await shoppingCart.collectShoppingCartItems(context.req, context.res);
  },
};

module.exports = shoppingCartItems;
