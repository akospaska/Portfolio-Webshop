const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const fs = require("fs");

const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(__dirname + "/public"));

const MyslqDatabaseConnection = require("./Backend/BackendConfig/MysqlDatabaseConfig");

//Import Classes
const EmailTemplates = require("./Classes/EmailSending/EmailTemplates/EmailTemplates");
const Account = require("./EndpointClasses/Account/Account");
const Session = require("./EndpointClasses/Session/Session");
const OrderEndpoint = require("./EndpointClasses/Order/OrderEndpointClass");

const SessionClass = require("./Classes/Authentication/Session");

const ContentProvider = require("./EndpointClasses/ContentProvider/ContentProvider");
const Cache = require("./Classes/Cache/Cache");
const ProductEndpointClass = require("./EndpointClasses/Product/ProductEndpointClass");
const OrderWithStripe = require("./EndpointClasses/OrderWithStripe/OrderWithStripe");
const StripeOrderVerification = require("./EndpointClasses/StripeOrderVerification/StripeOrderVerification");

const stripeConfirmation = new StripeOrderVerification();

const RootQueryType = require("./GraphQL/RootQueryType/RootQueryType");
const RootMutationType = require("./GraphQL/RootMutationType/RootMutationType");
//call classes
const AccountEndpoint = new Account();

const session = new Session();

const sessionClass = new SessionClass();

const orderEndpoint = new OrderEndpoint();

const contentProvider = new ContentProvider();
const cache = new Cache();

const product = new ProductEndpointClass();
const orderWithStripe = new OrderWithStripe();

app.get("/getwebshopphoto", (req, res) => {
  product.getWebshopPhoto(req, res);
});

app.post("/api/orderwithstripe", async (req, res) => {
  //The order sending by a customer is separeted if the customer pays the order via Stripe
  orderWithStripe.orderWithStripe(req, res);
});

app.post("/api/registernewproduct", async (req, res) => {
  product.registerNewProduct(req, res);
});

//Endpoints
app.post("/api/createnewpublicaccount", (req, res) => {
  AccountEndpoint.CreateNewPublicUser(req, res);
});

app.post("/api/createnewadminaccount", async (req, res) => {
  const checkSession = await sessionClass.identitifyClient(req, res);
  const requestOrigin = sessionClass.sessionResponseHandler(checkSession);

  if (requestOrigin.isAdminAccount && requestOrigin.adminDemo == false) AccountEndpoint.CreateNewPublicUser(req, res, true);
  else {
    res.status(403).send("Access Denied!");
  }
});

app.get("/api/sessionhandler", (req, res) => {
  session.sessionHandler(req, res);
});

app.post("/api/login", (req, res) => {
  AccountEndpoint.loginDatavalidation(req, res);
});

app.post("/api/sendorders", (req, res) => {
  orderEndpoint.PrintOrders(req, res);
});

app.get("/api/logout", (req, res) => {
  AccountEndpoint.logOut(req, res);
});

app.get("/api/accountverification", async (req, res) => {
  AccountEndpoint.accountCreationVerification(req, res);
});

app.get("/api/orderverification", async (req, res) => {
  orderEndpoint.OrderVerification(req, res);
});

app.get("/api/getlabels", async (req, res) => {
  const sessionKey = sessionClass.getCookie(req, res);
  const requestOrigin = await sessionClass.getSessionStoredValues(sessionKey);

  const origin = await sessionClass.sessionResponseHandler(requestOrigin);

  if (origin.isAdminAccount || origin.adminDemo) {
    if (!req.query.type || !req.query.loghistoryid) {
      res.send([]);
      return;
    }

    if (req.query.type == "pdf") {
      contentProvider.sendPDFLabel(req, res);
    }

    if (req.query.type == "logFile") {
      contentProvider.sendLogFile(req, res);
    }
  } else {
    res.status(403).send("Access Denied!");
  }
});

//RENDER HTML
app.get("/", function (req, res) {
  res.render("index");
});

app.get("/stripesuccessful", function (req, res) {
  res.render("index");
});

app.get("/admin", function (req, res) {
  res.render("index");
});

app.get("/checkout", function (req, res) {
  res.render("index");
});

app.get("/cart", function (req, res) {
  res.render("index");
});

app.get("/login", function (req, res) {
  res.render("index");
});

app.get("/productspage", function (req, res) {
  res.render("index");
});

//Handle and log the Exceptions
process.on("uncaughtException", (err, origin) => {
  const actualTimeStamp = Date.now();
  var stream = fs.createWriteStream(`./ErrorLogFiles/${actualTimeStamp}.txt`);
  stream.once("open", function (fd) {
    stream.write(`Error: ${err}\n`);
    stream.write(`Origin: ${origin}\n`);
    stream.end();
  });
});

//GRAPHQL
const { GraphQLSchema } = require("graphql");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use("/graphql", async (req, res) => {
  //Own Permission granter
  const accessGranted = await sessionClass.permissionController(req, res);

  if (accessGranted != true) {
    res.status(403).send("Access Denied!");
    return;
  }

  return expressGraphQL({
    schema,
    graphiql: false,
    context: { req, res },
  })(req, res);
});

const ip = require("ip");

console.dir(ip.address());

//Cache the price reduction percents based on the categories and the brands
cache.CreateCaches();

//clearAll();

app.listen(3000, () => console.log("Server Running"));

//Webhook for stipe integration //The Stripe documentation is the best what i have read so
app.post("/webhook", express.raw({ type: "application/json" }), async (request, response) => {
  if (request.body.type == "payment_intent.succeeded" && request.body.data.object.status == "succeeded") {
    stripeConfirmation.StripeOrderVerification(request, response);
  } else {
    response.sendStatus(400);
  }
});
