const User = require("../models/user.js");


module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
}


module.exports.signup = async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err) => {
        if(err) {
          return next(err);
        }
        req.flash("success", "Account registered successfully ");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  };


  module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success" ,"Welcome back to Wanderlust! You're now logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
  };

module.exports.logout = (req, res, next ) => {
  req.logOut((err) => {
    if(err) {
      next(err);
    }
    req.flash("success", "Account logged out successfully!");
    res.redirect("/listings")
  })
};