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

const Cache = require("../../../Classes/Cache/Cache");
const cache = new Cache();

const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");

const shoppingCart = new ShoppingCart();

const ShoppingCartType = new GraphQLObjectType({
  name: "ShoppingCartItems",
  description: "This represents a Brand with name",
  fields: () => ({
    itemId: { type: GraphQLNonNull(GraphQLInt) },
    count: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    categoryId: { type: GraphQLNonNull(GraphQLInt) },
    brandID: { type: GraphQLNonNull(GraphQLInt) },
    imgurl: { type: GraphQLNonNull(GraphQLString) },
    isFeatured: { type: GraphQLNonNull(GraphQLInt) },
    netPrice: { type: GraphQLNonNull(GraphQLFloat) },
    vat: { type: GraphQLNonNull(GraphQLFloat) },
    priceReduce: { type: GraphQLNonNull(GraphQLFloat) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
    finalPrice: {
      type: GraphQLNonNull(GraphQLFloat),
      resolve: async (product) => {
        const brandPriceReduce = cache.getBrandPriceReducedValues().find((a) => a.id == product.brandID).priceReduce;

        const categoryPriceReduce = cache.getCategoryPriceReducedValues().find((a) => a.id == product.categoryId).priceReduce;

        return shoppingCart.calculateFinalPrice(product.priceReduce, product.netPrice, product.vat, brandPriceReduce, categoryPriceReduce);
      },
    },
  }),
});

module.exports = ShoppingCartType;
