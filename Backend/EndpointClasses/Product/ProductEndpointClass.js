const fs = require("fs");
const path = require("path");
const getRootUrl = require("../../Backend/RootUrl");

const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");

class ProductEndpointClass {
  async registerNewProduct(req, res) {
    //register a new Product
    const actualTimestamp = new Date().getTime();

    // var base64Data = req.body.data_url.replace(/^data:image\/jpeg;base64,/, '');
    var base64Data = req.body.data_url.split(",");

    require("fs").writeFile(path.join(__dirname, `../../src/images/productimages/${actualTimestamp}.png`), base64Data[1], "base64", function (err) {
      console.log(err);
    });
    const resultObject = {
      photoUrl: `${getRootUrl()}getwebshopphoto?photoid=${actualTimestamp}`,
      itemName: req.body.itemName,
      netPrice: req.body.netPrice,
      vat: req.body.vat,
      priceReduce: req.body.priceReduce,
      categoryId: req.body.categoryId,
      brandId: req.body.brandId,
    };

    const insertQuery = await MyslqDatabaseConnection.awaitQuery(
      `insert into product (name,categoryId,BrandID,quantity,imgurl,netPrice,vat,priceReduce) values("${resultObject.itemName}",${resultObject.categoryId},${resultObject.brandId},50,"${resultObject.photoUrl}",${resultObject.netPrice},${resultObject.vat},${resultObject.priceReduce})`
    );

    res.send(resultObject);
  }
  async getWebshopPhoto(req, res) {
    //serve the product photo
    const something = path.join(__dirname, `../../src/images/productimages/${req.query.photoid}.png`);

    fs.readFile(something, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.contentType("image/jpeg,");
      res.send(data);
    });
  }
}

module.exports = ProductEndpointClass;
