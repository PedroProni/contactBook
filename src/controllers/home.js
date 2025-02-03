const Contact = require("../models/Contact");

exports.index = async (req, res) => {
  const contacts = await Contact.listContacts();
  res.render("index", { contacts });
  return;
};
