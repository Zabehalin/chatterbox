const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("http");
const container = require("./container");
const cookieParser = require("cookie-parser");
const validator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");

container.resolve(function (users, _, admin) {
  mongoConnectionString =
    "mongodb+srv://chatteradmin:chatteradmin@cluster0-ieu57.mongodb.net";
  mongoose.Promise = global.Promise;
  mongoose
    .connect(mongoConnectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((msg) => console.log("Connected to atlas => "))
    .catch((err) => console.log(err));

  const app = SetupExpress();
  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(process.env.PORT || 3333, function () {
      console.log("Server running on port 3333");
    });

    ConfigureExpress(app);

    const router = require("express-promise-router")();
    users.SetRouting(router);
    admin.SetRouting(router);
    app.use(router);
  }

  function ConfigureExpress(app) {
    require("./passport/passport-local");
    app.use(express.static("public"));
    app.use(cookieParser());
    app.set("view engine", "ejs");
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.use(validator());

    app.use(
      session({
        secret: "addyourownsecretkey",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
      })
    );

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    app.locals._ = _;
  }
});
