const express = require("express");
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

const ProductType = require("../Types/ProductType/ProductType");

const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");

const Account = require("../../EndpointClasses/Account/Account");
const Session = require("../../EndpointClasses/Session/Session");
const OrderEndpoint = require("../../EndpointClasses/Order/OrderEndpointClass");
const ShoppingCart = require("../../Classes/ShoppingCart/ShoppingCart");
const Order = require("../../Classes/Order/Order");
const AccountSQLclass = require("../../Classes/Account/AccountSQLclass");
const SessionClass = require("../../Classes/Authentication/Session");

const Cryption = require("../../Classes/Authentication/Cryption");

const LabelCreation = require("../../Classes/GLS/LabelCreation/LabelCreation");
const ContentProvider = require("../../EndpointClasses/ContentProvider/ContentProvider");
const Cache = require("../../Classes/Cache/Cache");
const Stripe = require("../../Classes/Stripe/Stripe");
const ProductEndpointClass = require("../../EndpointClasses/Product/ProductEndpointClass");
const OrderWithStripe = require("../../EndpointClasses/OrderWithStripe/OrderWithStripe");

const AccountEndpoint = new Account();
const accQuery = new AccountSQLclass();
const session = new Session();
const shoppingCart = new ShoppingCart();
const sessionClass = new SessionClass();

const order = new Order();
const orderEndpoint = new OrderEndpoint();

const contentProvider = new ContentProvider();
const cache = new Cache();
const stripe = new Stripe();

const pass = new Cryption();

const orderWithStripe = new OrderWithStripe();

const OrderType = require("../Types/OrderType/OrderType");
const MyglsAccountType = require("../Types/MyglsAccountType/MyglsAccountType");
const PickupAddressType = require("../Types/PickupAddressType/PickupAddressType");

const LogHistoryType = require("../Types/LogHistoryType/LogHistoryType");

const LogHistoryIDType = require("../Types/LogHistoryIDType/LogHistoryIDType");

const adminAccountType = require("../Types/adminAccountType/adminAccountType");
const StatusType = require("../Types/StatusType/StatusType");
const AccountDetailType = require("../Types/AccountDetailType/AccountDetailType");

const ShoppingCartType = require("../Types/ShoppingCartType/ShoppingCartType");
const CategoryType = require("../Types/CategoryType/CategoryType");
const BrandType = require("../Types/BrandType/BrandType");

//graphqueryies
const products = require("./products/products");
const orders = require("./orders/orders");
const collectOrders = require("./collectOrders/collectOrders");
const myglsAccount = require("./myglsAccount/myglsAccount");
const pickupAddress = require("./pickupAddress/pickupAddress");
const getLogHistory = require("./getLogHistory/getLogHistory");
const getPrintActionHistory = require("./getPrintActionHistory/getPrintActionHistory");
const adminAccount = require("./adminAccount/adminAccount");
const status = require("./status/status");
const accountDetail = require("./accountDetail/accountDetail");
const featuredProducts = require("./featuredProducts/featuredProducts");
const shoppingCartItems = require("./shoppingCartItems/shoppingCartItems");
const collectShoppingCartItemsForStripeOrder = require("./collectShoppingCartItemsForStripeOrder/collectShoppingCartItemsForStripeOrder");
const priceReducedProducts = require("./priceReducedProducts/priceReducedProducts");
const productsByCategoryId = require("./productsByCategoryId/productsByCategoryId");
const productsByBrandId = require("./productsByBrandId/productsByBrandId");
const productsByByIdList = require("./productsByByIdList/productsByByIdList");
const searchProduct = require("./searchProduct/searchProduct");
const product = require("./product/product");
const categories = require("./categories/categories");
const brands = require("./brands/brands");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    products: products,
    orders: orders,
    collectOrders: collectOrders,
    myglsAccount: myglsAccount,
    pickupAddress: pickupAddress,
    getLogHistory: getLogHistory,
    getPrintActionHistory: getPrintActionHistory,
    adminAccount: adminAccount,
    status: status,
    accountDetail: accountDetail,
    featuredProducts: featuredProducts,
    shoppingCartItems: shoppingCartItems,
    collectShoppingCartItemsForStripeOrder: collectShoppingCartItemsForStripeOrder,
    priceReducedProducts: priceReducedProducts,
    productsByCategoryId: productsByCategoryId,
    productsByBrandId: productsByBrandId,
    productsByByIdList: productsByByIdList,
    searchProduct: searchProduct,
    product: product,
    categories: categories,
    brands: brands,
  }),
});

module.exports = RootQueryType;
