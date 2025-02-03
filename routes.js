const express = require("express");
const route = express.Router();
const home = require("./src/controllers/home");
const login = require("./src/controllers/login");
const register = require("./src/controllers/register");
const contact = require("./src/controllers/contact");
const { loginRequired } = require("./src/middlewares/middleware");

// Rotas da home
route.get("/", loginRequired,home.index);

// Rotas de login
route.get("/register", register.index);
route.post("/register", register.create);
route.get("/login", login.index);
route.post("/login", login.login);
route.get("/logout", login.logout);

// Rotas de contato
route.get("/contact", loginRequired,contact.index);
route.post("/contact/register", loginRequired, contact.register);
route.get("/contact/:id", loginRequired, contact.editIndex);
route.post("/contact/edit/:id", loginRequired, contact.edit);
route.get("/contact/delete/:id", loginRequired, contact.delete);

module.exports = route;
