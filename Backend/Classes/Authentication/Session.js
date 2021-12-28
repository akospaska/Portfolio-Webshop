const Cookies = require("cookies");
const Cryption = require("./Cryption");

const crypto = new Cryption();

const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");

class Session {
  getSessionStoredValues(sessionKey) {
    //Get the accountId and the groupId of the sessionKey if it is exists
    return MyslqDatabaseConnection.awaitQuery(`select * from session where sessionKey = "${sessionKey}"  `);
  }
  sessionResponseHandler(sqlQueryResult) {
    //send an actual login state of the sessionKey to the frontend Aplication
    const { accountId, groupId } = sqlQueryResult[0];

    const isLoggedIn = accountId == 0 ? false : true;
    const isAdminAccount = groupId == 1 ? true : false;

    return { isLoggedIn: isLoggedIn, isAdminAccount: isAdminAccount, adminDemo: groupId == 3 ? true : false };
  }

  sessionModificationAfterSuccessLogin(id, groupId, actualClientSession) {
    //modify the sessionKey's actual state
    return MyslqDatabaseConnection.awaitQuery(`update session set accountId =${id},groupId=${groupId} where sessionKey = "${actualClientSession}"`);
  }
  deleteSessionKey(sessionKey) {
    //delete the sessionKey from the database
    return MyslqDatabaseConnection.awaitQuery(`delete from session where sessionKey = "${sessionKey}" ;`);
  }
  insertNewSessionValue(sessionKey) {
    //insert the new sessionKey into the database
    return MyslqDatabaseConnection.awaitQuery(`insert into session (sessionKey) values("${sessionKey}")`);
  }
  getCookie(req, res) {
    //get cookie from the request
    const cookies = new Cookies(req, res);

    const clientSession = cookies.get("referenceWebshop");

    return clientSession;
  }
  async validateBackendSecretKey(secretKey) {
    //check the stored backend secret key for the "inner" graphql requests
    const validationResult = await MyslqDatabaseConnection.awaitQuery(`select * from backendSecretKey where backendSecretKey="${secretKey}"`);

    if (validationResult.length == 1) return true;
    else {
      return false;
    }
  }

  async resetBackendSecretKey() {
    //set a new backendSecretKey   - A cron job has been set . Runs one time a day.
    const newSecretKey = crypto.generateRandomHash();
    const clearTable = await MyslqDatabaseConnection.awaitQuery("truncate table backendSecretKey");
    const insertNewSecretKey = await MyslqDatabaseConnection.awaitQuery(`insert into backendSecretKey (backendSecretKey) values("${newSecretKey}")`);
  }

  async identitifyClient(req, res) {
    //get sessionKey's actual status in one request
    const clientSessision = this.getCookie(req, res);

    if (!clientSessision) {
      return [];
    }

    return await this.getSessionStoredValues(clientSessision);
  }

  async requestGrouprightId(req, res) {
    const requestCookie = this.getCookie(req, res);

    const checkLoginStatus = await this.getSessionStoredValues(requestCookie);
  }

  queryIdentifier = (query) => {
    //Identify the graphql root query  - For permissionController
    const withoutspaces = query.split(" ").join("").toLowerCase();

    const splittedQuery = withoutspaces.split("{");

    const stringWhatContainsTheQueryRoot = splittedQuery[1];

    const queryRoot = stringWhatContainsTheQueryRoot.split("(");

    return queryRoot[0];
  };

  async permissionController(req, res) {
    try {
      //if the graphql query comes from the backend
      const [arr] = req.headers.cookie.split(";");
      const value = arr.split(":");

      if (!value[1]) {
        throw "Parameter is not a number!";
      }

      const permissionGranted = await this.validateBackendSecretKey(value[1]);

      return permissionGranted;
    } catch (error) {}

    //if the graphql query comes from the frontend
    const rootQuery = this.queryIdentifier(req.body.query);

    const y = this.getCookie(req, res);

    const x = await this.getSessionStoredValues(y);
    const requestOrigin = await this.sessionResponseHandler(x);

    //example:     { isLoggedIn: isLoggedIn, isAdminAccount: isAdminAccount, adminDemo: groupId == 3 ? true : false };

    const { isLoggedIn, isAdminAccount, adminDemo } = requestOrigin;
    let accessLevel;

    //client without register
    if (isLoggedIn == false) accessLevel = 0;

    //client with account
    if (isLoggedIn == true && isAdminAccount == false && adminDemo == false) accessLevel = 1;

    //admin demo
    if (isLoggedIn == true && isAdminAccount == false && adminDemo == true) accessLevel = 2;

    //admin
    if (isLoggedIn == true && isAdminAccount == true && adminDemo == false) accessLevel = 3;

    console.log(accessLevel);
    console.log(rootQuery);

    //2 get the rootquery name

    //accessLevel 0-withoutlogin; 1-client; 2-demoAdmin; 3-admin

    const permissionDatabase = [
      { rootName: "addnewshoppingcartitem", haveAccess: [0, 1] },
      { rootName: "removeshoppingcartitem", haveAccess: [0, 1] },
      { rootName: "modifyshoppingcartitemcount", haveAccess: [0, 1] },
      { rootName: "updateaccountdetail", haveAccess: [1] },
      { rootName: "sendorder", haveAccess: [0, 1] },
      { rootName: "createnewcategory", haveAccess: [3] },
      { rootName: "createnewbrand", haveAccess: [3] },
      { rootName: "removebrand", haveAccess: [3] },
      { rootName: "removecategory", haveAccess: [3] },
      { rootName: "updatepickupaddress", haveAccess: [3] },
      { rootName: "createnewpickupaddress", haveAccess: [3] },
      { rootName: "deletepickupaddress", haveAccess: [3] },
      { rootName: "createnewmyglsaccount", haveAccess: [3] },
      { rootName: "updatemyglsaccount", haveAccess: [3] },
      { rootName: "deletemyglsaccount", haveAccess: [3] },
      { rootName: "tooglemyglsaccountdefaultservice", haveAccess: [3] },
      { rootName: "deletebrand", haveAccess: [3] },
      { rootName: "createbrand", haveAccess: [3] },
      { rootName: "updatebrand", haveAccess: [3] },
      { rootName: "deletecategory", haveAccess: [3] },
      { rootName: "createcategory", haveAccess: [3] },
      { rootName: "updatecategory", haveAccess: [3] },
      { rootName: "deleteadminaccount", haveAccess: [3] },
      { rootName: "togglestatusadminaccount", haveAccess: [3] },
      { rootName: "toggleproductisfeatured", haveAccess: [3] },
      { rootName: "deleteproduct", haveAccess: [3] },
      { rootName: "updateproduct", haveAccess: [3] },
      { rootName: "updateordercontactperson", haveAccess: [2, 3] },
      { rootName: "modifyparcelcountbyorder", haveAccess: [2, 3] },
      { rootName: "updateorderstatus", haveAccess: [2, 3] },
      { rootName: "products", haveAccess: [0, 1, 2, 3] },
      { rootName: "deleteorder", haveAccess: [2, 3] },
      { rootName: "myglsaccount", haveAccess: [2, 3] },
      { rootName: "pickupaddress", haveAccess: [2, 3] },
      { rootName: "getloghistory", haveAccess: [2, 3] },
      { rootName: "getprintactionhistory", haveAccess: [2, 3] },
      { rootName: "adminaccount", haveAccess: [2, 3] },
      { rootName: "status", haveAccess: [1, 2, 3] },
      { rootName: "accountdetail", haveAccess: [1, 2, 3] },
      { rootName: "featuredproducts", haveAccess: [0, 1, 2, 3] },
      { rootName: "collectshoppingcartitemsforstripeorder", haveAccess: [0, 1] },
      { rootName: "pricereducedproducts", haveAccess: [0, 1, 2, 3] },
      { rootName: "pricereducedproducts: ", haveAccess: [0, 1, 2, 3] },
      { rootName: "productsbycategoryid", haveAccess: [0, 1, 2, 3] },
      { rootName: "productsbybrandid", haveAccess: [0, 1, 2, 3] },
      { rootName: "productsbybyidlist", haveAccess: [0, 1, 2, 3] },
      { rootName: "searchproduct", haveAccess: [0, 1, 2, 3] },
      { rootName: "product", haveAccess: [0, 1, 2, 3] },
      { rootName: "categories", haveAccess: [0, 1, 2, 3] },
      { rootName: "brands", haveAccess: [0, 1, 2, 3] },
      { rootName: "orders", haveAccess: [1, 2, 3] },
      { rootName: "updateorderstatuses", haveAccess: [2, 3] },
      { rootName: "collectorders", haveAccess: [2, 3] },
      { rootName: "shoppingcartitems", haveAccess: [0, 1, 2, 3] },
    ];

    let accessGranted;

    permissionDatabase.map((a) => {
      if (a.rootName == rootQuery) {
        console.log("I am here hello");

        accessGranted = a.haveAccess.includes(accessLevel);
      }
    });

    console.log(accessGranted);

    return accessGranted;
    //3 decide is it allowed or not
  }
}
module.exports = Session;
