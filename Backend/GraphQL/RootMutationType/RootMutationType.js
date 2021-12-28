const expressGraphQL = require("express-graphql").graphqlHTTP;

const { GraphQLObjectType } = require("graphql");

const addNewShoppingCartItem = require("./addNewShoppingCartItem/addNewShoppingCartItem");
const removeShoppingCartItem = require("./removeShoppingCartItem/removeShoppingCartItem");
const modifyShoppingCartItemCount = require("./modifyShoppingCartItemCount/modifyShoppingCartItemCount");
const updateAccountDetail = require("./updateAccountDetail/updateAccountDetail");
const sendOrder = require("./sendOrder/sendOrder");
const createNewCategory = require("./createNewCategory/createNewCategory");
const createNewBrand = require("./createNewBrand/createNewBrand");
const removeBrand = require("./removeBrand/removeBrand");
const removeCategory = require("./removeCategory/removeCategory");
const updatePickUpAddress = require("./updatePickUpAddress/updatePickUpAddress");
const createNewPickupAddress = require("./createNewPickupAddress/createNewPickupAddress");
const deletePickupAddress = require("./deletePickupAddress/deletePickupAddress");
const createNewMyglsAccount = require("./createNewMyglsAccount/createNewMyglsAccount");
const updateMyglsAccount = require("./updateMyglsAccount/updateMyglsAccount");
const deleteMyglsAccount = require("./deleteMyglsAccount/deleteMyglsAccount");
const toogleMyglsAccountDefaultService = require("./toogleMyglsAccountDefaultService/toogleMyglsAccountDefaultService");
const deleteBrand = require("./deleteBrand/deleteBrand");
const createBrand = require("./createBrand/createBrand");
const updateBrand = require("./updateBrand/updateBrand");
const deleteCategory = require("./deleteCategory/deleteCategory");
const createCategory = require("./createCategory/createCategory");
const updateCategory = require("./updateCategory/updateCategory");
const deleteAdminAccount = require("./deleteAdminAccount/deleteAdminAccount");
const toggleStatusAdminAccount = require("./toggleStatusAdminAccount/toggleStatusAdminAccount");
const toggleProductIsFeatured = require("./toggleProductIsFeatured/toggleProductIsFeatured");
const deleteProduct = require("./deleteProduct/deleteProduct.js");
const updateProduct = require("./updateProduct/updateProduct");
const updateOrderContactPerson = require("./updateOrderContactPerson/updateOrderContactPerson");
const modifyParcelCountByOrder = require("./modifyParcelCountByOrder/modifyParcelCountByOrder");
const updateOrderStatus = require("./updateOrderStatus/updateOrderStatus");
const updateOrderStatuses = require("./updateOrderStatuses/updateOrderStatuses");
const deleteOrder = require("./deleteOrder/deleteOrder");

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => {
    return {
      addNewShoppingCartItem: addNewShoppingCartItem,
      removeShoppingCartItem: removeShoppingCartItem,
      modifyShoppingCartItemCount: modifyShoppingCartItemCount,
      updateAccountDetail: updateAccountDetail,
      sendOrder: sendOrder,
      createNewCategory: createNewCategory,
      createNewBrand: createNewBrand,
      removeBrand: removeBrand,
      removeCategory: removeCategory,
      updatePickUpAddress: updatePickUpAddress,
      createNewPickupAddress: createNewPickupAddress,
      deletePickupAddress: deletePickupAddress,
      createNewMyglsAccount: createNewMyglsAccount,
      updateMyglsAccount: updateMyglsAccount,
      deleteMyglsAccount: deleteMyglsAccount,
      toogleMyglsAccountDefaultService: toogleMyglsAccountDefaultService,
      deleteBrand: deleteBrand,
      createBrand: createBrand,
      updateBrand: updateBrand,
      deleteCategory: deleteCategory,
      createCategory: createCategory,
      updateCategory: updateCategory,
      deleteAdminAccount: deleteAdminAccount,
      toggleStatusAdminAccount: toggleStatusAdminAccount,
      toggleProductIsFeatured: toggleProductIsFeatured,
      deleteProduct: deleteProduct,
      updateProduct: updateProduct,
      updateOrderContactPerson: updateOrderContactPerson,
      modifyParcelCountByOrder: modifyParcelCountByOrder,
      updateOrderStatus: updateOrderStatus,
      updateOrderStatuses: updateOrderStatuses,
      deleteOrder: deleteOrder,
    };
  },
});

module.exports = RootMutationType;
