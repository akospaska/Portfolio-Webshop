const Cryption = require("../Authentication/Cryption");
const AccountSQLclass = require("./AccountSQLclass");

const Pass = new Cryption();
const SQLAccount = new AccountSQLclass();

class Account {
  CreateNewPublicUser = (req, res) => {
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
        console.log("STATUS2");
        res.status(420).json({ message: "Account allready exists" });
        return;
      }
      //Execute the new account insert into the database
      const insertAccountRecord = await SQLAccount.createNewPublicAccount(email, hashedPassword);
      res.send(insertAccountRecord);
    })();
  };
}

module.exports = Account;
