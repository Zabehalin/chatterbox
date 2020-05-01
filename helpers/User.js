module.exports = function () {
  return {
    RegisterValidation: (req, res, next) => {
      req.checkBody("username", "Username is Required").notEmpty();
      req
        .checkBody("username", "Username must be at least 3 characters")
        .isLength({ min: 3 });

      req
        .getValidationResult()
        .then((result) => {
          const errors = result.array();
          const messages = [];
          errors.forEach((error) => {
            messages.push(error.msg);
          });

          req.flash("error", messages);
          res.redirect("/register");
        })
        .catch((err) => {
          return next();
        });
    },
  };
};
