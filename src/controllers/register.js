const User = require("../models/User");

exports.index = (req, res) => {
  res.render("register");
};

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.register();

    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(() => res.redirect("./register"));
      return;
    }

    req.flash("success", `User created successfully.`);
    req.session.save(() => res.redirect("./register"));
  } catch (err) {
    console.log(err);
    return res.render("404");
  }
};
