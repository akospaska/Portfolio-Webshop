const SessionClass = require("../Authentication/Session");
const sessionHandler = new SessionClass();
const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");

class ShoppingCart {
  //the quuery results based on the client's cookie (is the client logged in or not.)
  async collectShoppingCartItems(req, res) {
    const [sessionIdentity] = await sessionHandler.identitifyClient(req, res);

    if (sessionIdentity == []) {
      return [];
    }

    //If the user is not logged in
    if (sessionIdentity.accountId == 0) {
      console.log("or here");
      return await MyslqDatabaseConnection.awaitQuery(
        `select * from shoppingcartitem sci join product p on p.id = sci.itemId where sci.sessionKey="${sessionIdentity.sessionKey}"`
      );
    }

    //If the user logged in
    if (sessionIdentity.accountId > 0) {
      return await MyslqDatabaseConnection.awaitQuery(
        `select * from shoppingcartitem sci join product p on p.id = sci.itemId where sci.accountId=${sessionIdentity.accountId}`
      );
    }
  }

  async collectShoppingCartItemsForStripeOrder(accountId, sessionKey) {
    //If the user is not logged in
    if (accountId == 0) {
      console.log("or here");
      return await MyslqDatabaseConnection.awaitQuery(
        `select * from shoppingcartitem sci join product p on p.id = sci.itemId where sci.sessionKey="${sessionKey}"`
      );
    }

    //If the user logged in
    if (accountId > 0) {
      return await MyslqDatabaseConnection.awaitQuery(
        `select * from shoppingcartitem sci join product p on p.id = sci.itemId where sci.accountId=${accountId}`
      );
    }
  }

  async collectShoppingCartItemsByAccountVerification(sessionKey, orderId) {
    return await MyslqDatabaseConnection.awaitQuery(
      `select p.*,oi.count  from orderitem oi join \`order\` o on o.id = oi.orderId join product p on p.id = oi.itemId where orderRequestConfirmationtSessionKey="${sessionKey}" and o.id =${orderId} `
    );
  }

  async addNewShoppingCartItem(req, res, itemId) {
    const [sessionIdentity] = await sessionHandler.identitifyClient(req, res);

    if (sessionIdentity == []) {
      return [];
    }

    //If the client is not logged in
    if (sessionIdentity.accountId == 0) {
      const allreadyInShoppingCart = await MyslqDatabaseConnection.awaitQuery(
        `select p.id from shoppingcartitem sci join product p on p.id = sci.itemId where sci.sessionKey="${sessionIdentity.sessionKey}"`
      );

      const includeChecker = (a) => a.id == itemId;

      const includes = allreadyInShoppingCart.some(includeChecker);

      if (includes) {
        console.log();

        return await MyslqDatabaseConnection.awaitQuery(
          `update shoppingCartItem set count=count+1 where itemId=${itemId} and sessionKey="${sessionIdentity.sessionKey}"`
        );
      } else {
        return await MyslqDatabaseConnection.awaitQuery(`insert into shoppingCartItem (itemId,sessionKey) values(${itemId},"${sessionIdentity.sessionKey}")`);
      }
    }

    //If the client is logged in
    if (sessionIdentity.accountId > 0) {
      const allreadyInShoppingCart = await MyslqDatabaseConnection.awaitQuery(
        `select p.id from shoppingcartitem sci join product p on p.id = sci.itemId where sci.accountId=${sessionIdentity.accountId}`
      );

      const includeChecker = (a) => a.id == itemId;

      const includes = allreadyInShoppingCart.some(includeChecker);
      if (includes) {
        return await MyslqDatabaseConnection.awaitQuery(
          `update shoppingCartItem set count=count+1 where itemId=${itemId} and accountId="${sessionIdentity.accountId}"`
        );
      } else {
        return await MyslqDatabaseConnection.awaitQuery(`insert into shoppingCartItem (itemId,accountId) values(${itemId},${sessionIdentity.accountId})`);
      }
    }
  }

  async modifyShoppingCartItemCount(req, res, itemId, direction) {
    const [sessionIdentity] = await sessionHandler.identitifyClient(req, res);

    if (sessionIdentity == []) {
      return [];
    }

    //If the client is not logged in
    if (sessionIdentity.accountId == 0) {
      return await MyslqDatabaseConnection.awaitQuery(
        `update shoppingCartItem set count =count ${direction}1  where itemId=${itemId} and sessionKey="${sessionIdentity.sessionKey}"`
      );
    }

    //If the client is logged in
    if (sessionIdentity.accountId > 0) {
      return await MyslqDatabaseConnection.awaitQuery(
        `update shoppingCartItem set count =count ${direction}1  where itemId=${itemId} and accountId="${sessionIdentity.accountId}"`
      );
    }
  }

  async removeShoppingCartItem(req, res, itemId) {
    const [sessionIdentity] = await sessionHandler.identitifyClient(req, res);

    if (sessionIdentity == []) {
      return [];
    }

    //If the client is not logged in
    if (sessionIdentity.accountId == 0) {
      return await MyslqDatabaseConnection.awaitQuery(`delete from shoppingCartItem where itemId=${itemId} and sessionKey="${sessionIdentity.sessionKey}"`);
    }

    //If the client is logged in
    if (sessionIdentity.accountId > 0) {
      return await MyslqDatabaseConnection.awaitQuery(`delete from shoppingCartItem where itemId=${itemId} and accountId="${sessionIdentity.accountId}"`);
    }
  }

  calculateFinalPrice(priceReduce, netPrice, vat, brandPriceReduce, categoryPriceReduce) {
    const totalPriceReduce = priceReduce + brandPriceReduce + categoryPriceReduce;

    const isPriceReduced = totalPriceReduce == 0 ? false : true;

    const priceReductionPercent = 1 - totalPriceReduce / 100;

    const FinalPrice =
      isPriceReduced == false ? (netPrice + (netPrice * vat) / 100).toFixed(0) : ((netPrice + (netPrice * vat) / 100) * priceReductionPercent).toFixed(0);

    return FinalPrice;
  }

  async grapShopingCartToAccount(sessionKey, accountId) {
    //Grab all the shopping cart items and set to the client's accountId
    return await MyslqDatabaseConnection.awaitQuery(`update shoppingCartItem set accountId =${accountId} , sessionKey=null where sessionKey="${sessionKey}"`);
  }

  async emptyShoppingCart(sessionKey, accountId) {
    //Clear the shoppingCart
    if (accountId >= 1) {
      return await MyslqDatabaseConnection.awaitQuery(`delete from shoppingCartItem where accountId=${accountId}`);
    } else {
      return await MyslqDatabaseConnection.awaitQuery(`delete from shoppingCartItem where sessionKey="${sessionKey}"`);
    }
  }
}

module.exports = ShoppingCart;
