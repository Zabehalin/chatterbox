"use strict";

module.exports = function (_, passport) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      router.get("/register", this.registerPage);
      router.post("/register", this.postRegister);
      router.get("/login", this.loginPage);
    },

    indexPage: function (req, res) {
      return res.render("index", { title: "Home page" });
    },
    registerPage: function (req, res) {
      return res.render("register");
    },
    loginPage: function (req, res) {
      return res.render("login");
    },
    postRegister: passport.authenticate("local.signup", {
      successRedirect: "/",
      failureRedirect: "/register",
      failureFlash: true,
    }),
  };
};
