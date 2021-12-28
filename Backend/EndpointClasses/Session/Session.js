const Cookies = require("cookies");

const Cryption = require("../../Classes/Authentication/Cryption");

const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");
const Session = require("../../Classes/Authentication/Session");

const session = new Session();
const hasher = new Cryption();
const hashValue = new Cryption();

class SessionEndpoint {
  sessionHandler(req, res) {
    //Get the sessionKey from the client
    const cookies = new Cookies(req, res);

    const clientSession = cookies.get("referenceWebshop");

    //if the client has not any session than set a new one
    if (!clientSession) {
      //Generate a new hashKey
      const newSessionKey = hasher.generateRandomHash();

      //Set new cookie
      cookies.set("referenceWebshop", newSessionKey, {
        httpOnly: true, // true by default
      });
      //Store the value into the database
      MyslqDatabaseConnection.awaitQuery(`insert into session (sessionKey) values("${newSessionKey}") `);

      //send the loginStatus back to the frontend. isLoggedIn:false,isAdmin:false,cart:[]
      res.send({ isLoggedIn: false, isAdmin: false, adminDemo: false });

      return;
    }

    (async () => {
      //get loginStatus from the database based on the sessionKey
      const searchResult = await session.getSessionStoredValues(clientSession);

      //If there is no match than create a new one, set it and send the login status back to the frontend
      if (searchResult.length == 0) {
        cookies.set("referenceWebshop", hashValue.generateRandomHash(), {
          httpOnly: true, // true by default
        });
        res.send({ isLoggedIn: false, isAdmin: false, adminDemo: false });
        return;
      } else {
        //Send back to the frontend the actual login Status ; Example: { isLoggedIn: true, isAdmin: false, adminDemo:false }
        const responseBody = session.sessionResponseHandler(searchResult);

        res.send(responseBody);
      }
    })();
  }
}

module.exports = SessionEndpoint;
