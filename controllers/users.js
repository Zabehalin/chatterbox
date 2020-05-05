"use strict";

module.exports = function (_, passport, User) {
  return {
    SetRouting: function (router) {
      router.get("/", this.loginPage);
      router.get("/home", this.indexPage);
      router.get("/register", this.registerPage);
      
      router.post("/register", User.RegisterValidation, this.postRegister);
      router.post("/", User.LoginValidation, this.postLogin);
      router.get("/login", this.loginPage);
      router.post("/login", this.postLogin);
    },

    indexPage: function (req, res) {
      return res.render("index", {
        title: "Chatterbox | Main",
      });
    },
    registerPage: function (req, res) {
      const errors = req.flash("error");
      return res.render("register", {
        title: "Chatterbox | Login",
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },
    loginPage: function (req, res) {
      const errors = req.flash("error");
      return res.render("login", {
        title: "Chatterbox | Login",
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },
    forgotPage: function (req, res) {
      return res.render("forgot");
    },

    postRegister: passport.authenticate("local.signup", {
      successRedirect: "/home",
      failureRedirect: "/register",
      failureFlash: true,
    }),
    postLogin: passport.authenticate("local.login", {
      successRedirect: "/home",
      failureRedirect: "/",
      failureFlash: true,
    }),
  };
};
