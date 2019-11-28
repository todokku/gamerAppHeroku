const express = require("express");
const expressip = require("express-ip");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { logRequest } = require("./middleware/logRequest");
const { connection } = require("./db/connection");
const loginRoute = require("./route/login");
const signUpRoute = require("./route/signUp");
const emailConfirmation = require("./route/emailConfirmation");
const googleSignUp = require("./route/google/googleSignUp");
const googleLogin = require("./route/google/googleLogin");
const passReminder = require("./route/passReminder");
const insertGame = require("./route/insertGame");
const changeGameMission = require("./route/changeGameMission");
const deleteGame = require("./route/deleteGame");
const updateProfile = require("./route/updateProfile");
const giveMeRank = require("./route/giveMeRank");
const deleteAccount = require("./route/deleteAccount");
const loginAdmin = require("./route/loginAdmin");
const allAccounts = require("./route/allAccounts");
const notConfirmed = require("./route/notConfirmed");
const deleteNotConfirmed = require("./route/deleteNotConfirmed");
const checkRequest = require("./util/checkRequest");
const getUser = require("./route/getUser");

const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(expressip().getIpInfoMiddleware);
app.use(logRequest);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

connection.then(() => {
  loginRoute(app);
  signUpRoute(app);
  emailConfirmation(app);
  googleSignUp(app);
  googleLogin(app);
  passReminder(app);
  insertGame(app);
  changeGameMission(app);
  deleteGame(app);
  updateProfile(app);
  giveMeRank(app);
  deleteAccount(app);
  loginAdmin(app);
  allAccounts(app);
  notConfirmed(app);
  deleteNotConfirmed(app);
  getUser(app);

  app.listen(process.env.PORT || PORT, () => {
    console.log("Server is running");
    checkRequest();
  });
});
