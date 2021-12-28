const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLString, GraphQLList, GraphQLInt } = require("graphql");

const ShoppingCartType = require("../../Types/ShoppingCartType/ShoppingCartType");

const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");

const shoppingCart = new ShoppingCart();

const collectShoppingCartItemsForStripeOrder = {
  type: new GraphQLList(ShoppingCartType),
  description: "list of all products in the shopping cart based on the sessionvalue or accountId",
  args: {
    accountId: { type: GraphQLInt },
    sessionKey: { type: GraphQLString },
  },

  resolve: async (root, args, context) => {
    return await shoppingCart.collectShoppingCartItemsForStripeOrder(args.accountId, args.sessionKey);
  },
};

module.exports = collectShoppingCartItemsForStripeOrder;
