const MyslqDatabaseConnection = require("../../Backend/BackendConfig/MysqlDatabaseConfig");
const Session = require("../Authentication/Session");

const SessionHandler = new Session();

class AccountSQLclass {
  checkIsAccountAllreadyExists(email) {
    return MyslqDatabaseConnection.awaitQuery(`select * from account where email = "${email}" and isActive=1;`);
  }
  createAccountPreRegistrationRequest(email, hashedPassword, groupId, accountCreationRequestSessionKey) {
    return MyslqDatabaseConnection.awaitQuery(
      `insert into accountcreationrequest (accountCreationRequestSessionKey,email,password,groupId) values("${accountCreationRequestSessionKey}","${email}","${hashedPassword}",${groupId})`
    );
  }
  createNewPublicAccount(email, hashedPassword) {
    return MyslqDatabaseConnection.awaitQuery(`insert into account (email,password,groupId) values("${email}","${hashedPassword}",2);`);
  }
  loginVerification(email, hashedPassword) {
    return MyslqDatabaseConnection.awaitQuery(`select * from account where email ="${email}" and password ="${hashedPassword}" and isActive=1;`);
  }
  async getAccountdetails(req, res) {
    //get the delivery address of the client's account

    const clientSessionKey = SessionHandler.getCookie(req, res);
    const [accountId] = await SessionHandler.getSessionStoredValues(clientSessionKey);
    const [accountDetail] = await MyslqDatabaseConnection.awaitQuery(`select * from accountDetail where accountId = ${accountId.accountId}`);
    return accountDetail;
  }
  clientAccountDetailsUpdate = async (req, res, newAccountDetailObject) => {
    //update the delivery address of the client's account

    //Declare the values of the request
    const { deliveryName, deliveryCountry, deliveryZipCode, deliveryCity, deliveryStreet, deliveryContactEmail, deliveryContactPhone } = newAccountDetailObject;

    //Get the sessionValue of the client
    const clientSession = SessionHandler.getCookie(req, res);

    //Get the accountId of the client
    const [getAccountId] = await SessionHandler.getSessionStoredValues(clientSession);

    //If the delivery address didn't exists than create a new.
    const checkAccountDetailIsExists = await MyslqDatabaseConnection.awaitQuery(`select * from accountDetail where accountId=${getAccountId.accountId}`);

    if (checkAccountDetailIsExists.length == 0) {
      const insertResult = await MyslqDatabaseConnection.awaitQuery(
        `insert into accountDetail ( accountId,deliveryName,deliveryCountry,deliveryZipCode,deliveryCity,deliveryStreet,deliveryContactEmail,deliveryContactPhone) values(${getAccountId.accountId},"${deliveryName}","${deliveryCountry}","${deliveryZipCode}","${deliveryCity}","${deliveryStreet}","${deliveryContactEmail}","${deliveryContactPhone}")`
      );

      return insertResult;
    }
    //If the delivery address exists than update it.
    else {
      const updateResult = await MyslqDatabaseConnection.awaitQuery(
        `update accountDetail set deliveryName ="${deliveryName}" , deliveryCountry ="${deliveryCountry}" ,deliveryZipCode ="${deliveryZipCode}" ,deliveryCity ="${deliveryCity}" ,deliveryStreet ="${deliveryStreet}" ,deliveryContactEmail ="${deliveryContactEmail}",deliveryContactPhone ="${deliveryContactPhone}" where accountId=${getAccountId.accountId}`
      );

      return await updateResult;
    }
  };
  async checkAccountCreatinDataBySessionKey(sessionKey) {
    //Validate the sessionkey of the accountConfirmation request (From e-mail)
    const checkResult = await MyslqDatabaseConnection.awaitQuery(
      `select * from accountCreationRequest where accountCreationRequestSessionKey ="${sessionKey}" `
    );
    return checkResult;
  }
  async deleteAccountCreatinDataBySessionKey(sessionKey) {
    //Delete the sessionKey from the database from the accountCreationRequest table
    const checkResult = await MyslqDatabaseConnection.awaitQuery(`delete from accountCreationRequest where accountCreationRequestSessionKey ="${sessionKey}" `);
    return checkResult;
  }
}

module.exports = AccountSQLclass;
