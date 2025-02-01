const User = require("../models/User");

exports.index = (req, res) => {
  if (req.session.user) {
    res.redirect("/");
    return;
  }

  res.render("login");
};

exports.login = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.login();

    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(() => res.redirect("./login"));
      return;
    }

    req.flash("success", `You have successfully logged in.`);
    req.session.user = user.user;
    req.session.save(() => res.redirect("./"));
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("./login");
};
