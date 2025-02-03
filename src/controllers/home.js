const Contact = require("../models/Contact");

exports.index = async (req, res) => {
  const contacts = await Contact.listContacts(req.session.user._id);
  res.render("index", { contacts });
  return;
};
