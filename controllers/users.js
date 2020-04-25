"use strict";

module.exports = function (_) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      router.get("/register", this.registerPage);
      router.get("/login", this.loginPage);
    },

    indexPage: function (req, res) {
      return res.render("index", { title: "Test | pass" });
    },
    registerPage: function (req, res) {
      return res.render("register");
    },
    loginPage: function (req, res) {
      return res.render("login");
    },
  };
};
