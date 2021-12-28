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

const Cache = require("../../../Classes/Cache/Cache");

const cache = new Cache();

const ShoppingCart = require("../../../Classes/ShoppingCart/ShoppingCart");
const shoppingCart = new ShoppingCart();

const OrderItemType = new GraphQLObjectType({
  name: "OrderItem",
  description: "This represents a product order item",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    categoryId: { type: GraphQLNonNull(GraphQLInt) },
    brandID: { type: GraphQLNonNull(GraphQLInt) },
    imgurl: { type: GraphQLNonNull(GraphQLString) },
    isFeatured: { type: GraphQLNonNull(GraphQLBoolean) },
    netPrice: { type: GraphQLNonNull(GraphQLFloat) },
    vat: { type: GraphQLNonNull(GraphQLFloat) },
    priceReduce: { type: GraphQLNonNull(GraphQLFloat) },
    creationDate: { type: GraphQLNonNull(GraphQLString) },
    count: { type: GraphQLNonNull(GraphQLInt) },
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

module.exports = OrderItemType;
