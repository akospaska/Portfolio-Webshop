const Cryption = require("../../Classes/Authentication/Cryption");
const AccountSQLclass = require("../../Classes/Account/AccountSQLclass");
const Cookies = require("cookies");

const Session = require("../../Classes/Authentication/Session");
const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");
const ShoppingCart = require("../../Classes/ShoppingCart/ShoppingCart");
const EmailTemplates = require("../../Classes/EmailSending/EmailTemplates/EmailTemplates");

const Pass = new Cryption();
const SQLAccount = new AccountSQLclass();
const Cart = new ShoppingCart();
const sendEmail = new EmailTemplates();

const SessionHandler = new Session();

class Account {
  CreateNewPublicUser = (req, res, isAdmin = false) => {
    const { email, password } = req.body;

    //request body validation
    if (!email || !email.includes("@") || !password || password.trim().length < 6) {
      res.status(422).json({ message: "Invalid credentials" });
      return;
    }

    (async () => {
      const hashedPassword = Pass.passwordToSHA512(password);

      //check is the account allready exists
      const checkAccountExists = await SQLAccount.checkIsAccountAllreadyExists(email);

      if (checkAccountExists.length > 0) {
        res.status(420).json({ message: "Account allready exists" });
        return;
      }

      //Execute the new account insert into the database
      const accountCreationRequestSessionKey = Pass.generateRandomHash();

      const groupId = isAdmin ? 1 : 2;
      const insertAccountRecord = await SQLAccount.createAccountPreRegistrationRequest(email, hashedPassword, groupId, accountCreationRequestSessionKey);

      sendEmail.sendAccountVerificationTemplate(email, accountCreationRequestSessionKey);

      res.send(insertAccountRecord);
    })();
  };

  loginDatavalidation = (req, res) => {
    const { email, password } = req.body;
    (async () => {
      const hashedPassword = Pass.passwordToSHA512(password);

      const accountValidationResult = await SQLAccount.loginVerification(email, hashedPassword);

      if (!accountValidationResult.length > 0) {
        res.status(422).json({ message: "Invalid credentials" });
        return;
      } else {
        const clientSession = SessionHandler.getCookie(req, res);

        //collect the client's actual shopping cart items
        const shoppingCartItems = await Cart.collectShoppingCartItems(req, res);

        //Grab thees items and attach to the client's accountid
        const migrateCartItems = await Cart.grapShopingCartToAccount(clientSession, accountValidationResult[0].id);

        //set the accountId and the group id of the stored sessionKey
        const updateClientSession = await SessionHandler.sessionModificationAfterSuccessLogin(
          accountValidationResult[0].id,
          accountValidationResult[0].groupId,
          clientSession
        );

        //send the login results back to the frontend
        const { accountId, groupId } = accountValidationResult[0];

        const isLoggedIn = accountId == 0 ? false : true;
        const isAdminAccount = groupId == 1 ? true : false;
        const cart = [];

        res.send({ isLoggedIn: isLoggedIn, isAdminAccount: isAdminAccount, cart: cart });
      }
    })();
  };
  logOut = (req, res) => {
    (async () => {
      //get the client's sessionKey
      const cookies = new Cookies(req, res);
      const clientSessionKey = cookies.get("referenceWebshop");

      //delete the sessionKey from the database
      const deleteSession = await SessionHandler.deleteSessionKey(clientSessionKey);

      //set and store a new session
      const newSessionKey = Pass.generateRandomHash();
      const storeNewSession = await SessionHandler.insertNewSessionValue(newSessionKey);

      cookies.set("referenceWebshop", newSessionKey);

      res.send({ success: true });
    })();
  };

  accountCreationVerification = async (req, res) => {
    //get the verificationKey from the url
    const accountCreationSessionKey = req.query.sessionKey;

    //if there is not any sessionKey than return
    if (accountCreationSessionKey == undefined) {
      res.status(420).json({ message: "Invalid sessionkey" });
      return;
    }

    //Check the sessionKey value in the database
    const [checkResult] = await SQLAccount.checkAccountCreatinDataBySessionKey(accountCreationSessionKey);

    //if there is no match or has been expired, than return
    if (checkResult == undefined) {
      res.status(420).json({ message: "Invalid validationkey" });
      return;
    }

    //Check is the new e-mail address is allready registered and active in the database
    const checkAccountExists = await SQLAccount.checkIsAccountAllreadyExists(checkResult.email);

    //if yes, than return
    if (checkAccountExists.length > 0) {
      res.status(420).json({ message: "Account allready exists" });
      return;
    } else {
      //insert the new account's details into the database
      const insertResult = await SQLAccount.createNewPublicAccount(checkResult.email, checkResult.password);

      //remove sessionkey from accountverificationRequest
      const deleteSessionKeyResult = await SQLAccount.deleteAccountCreatinDataBySessionKey(accountCreationSessionKey);
      res.redirect(307, "/");
      return insertResult;
    }
  };
}

module.exports = Account;
