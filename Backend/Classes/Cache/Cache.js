const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

class Cache {
  CreateCaches() {
    myCache.flushAll();
    const categoryPriceReduce = MyslqDatabaseConnection.awaitQuery("select id,priceReduce from category");
    const brandPriceReduce = MyslqDatabaseConnection.awaitQuery("select id,priceReduce from brand");

    categoryPriceReduce.then((a) => {
      myCache.set("categoryReduced", a);
    });

    brandPriceReduce.then((b) => {
      myCache.set("brandPriceReduce", b);
    });
  }

  getBrandPriceReducedValues() {
    const value = myCache.get("brandPriceReduce");
    if (value == undefined) {
      // handle miss!
    } else {
      return value;
    }
  }

  getCategoryPriceReducedValues() {
    const value = myCache.get("categoryReduced");
    if (value == undefined) {
      // handle miss!
    } else {
      return value;
    }
  }
}

module.exports = Cache;
