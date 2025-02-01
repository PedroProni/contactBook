exports.index = (req, res) => {
  if (!req.session.user) return res.render("login");
  res.render("index");
  return;
};
