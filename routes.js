const express = require("express");
const route = express.Router();
const home = require("./src/controllers/home");
const login = require("./src/controllers/login");
const register = require("./src/controllers/register");

// Rotas da home
route.get("/", home.index);

// Rotas de login
route.get("/login", login.index);
route.get("/register", register.index);
route.post("/register", register.create);

module.exports = route;
