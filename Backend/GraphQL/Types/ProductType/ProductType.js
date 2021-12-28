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

const MyslqDatabaseConnection = require("../../../Backend/BackendConfig/MysqlDatabaseConfig");

const CategoryType = require("../CategoryType/CategoryType");

const BrandType = require("../BrandType/BrandType");

const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");
const shoppingCart = new ShoppingCart();

const Cache = require("../../../Classes/Cache/Cache");

const cache = new Cache();

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "This represents a product with brand name",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    categoryId: { type: GraphQLNonNull(GraphQLInt) },
    brandID: { type: GraphQLNonNull(GraphQLInt) },
    quantity: { type: GraphQLNonNull(GraphQLInt) },
    imgurl: { type: GraphQLNonNull(GraphQLString) },
    isFeatured: { type: GraphQLNonNull(GraphQLBoolean) },
    netPrice: { type: GraphQLNonNull(GraphQLFloat) },
    vat: { type: GraphQLNonNull(GraphQLFloat) },
    priceReduce: { type: GraphQLNonNull(GraphQLFloat) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
    category: {
      type: CategoryType,
      resolve: async (product) => {
        const sqlQueryResult = await MyslqDatabaseConnection.awaitQuery(`select * from category where id=${product.categoryId} limit 1`);
        return sqlQueryResult[0];
      },
    },
    finalPrice: {
      type: GraphQLNonNull(GraphQLFloat),
      resolve: async (product) => {
        //there should be all of the pricereduce//based on categories and brands

        const brandPriceReduce = cache.getBrandPriceReducedValues().find((a) => a.id == product.brandID).priceReduce;

        const categoryPriceReduce = cache.getCategoryPriceReducedValues().find((a) => a.id == product.categoryId).priceReduce;

        return shoppingCart.calculateFinalPrice(product.priceReduce, product.netPrice, product.vat, brandPriceReduce, categoryPriceReduce);
      },
    },

    brand: {
      type: BrandType,
      resolve: async (product) => {
        const sqlQueryResult = await MyslqDatabaseConnection.awaitQuery(`select * from brand where id=${product.brandID} limit 1`);
        return sqlQueryResult[0];
      },
    },
  }),
});

module.exports = ProductType;
