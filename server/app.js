// Express

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");

const app = express();

//Import routings
const authRoutes = require("./router/auth");

// Configure Body Parse
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configure static files (Sirve para subir archivos en el cliente)
app.use(express.static("uploads"));

// Configure Header HTTP - CORS 
app.use(cors());


// Configure routings
app.use(`/api/${API_VERSION}`, authRoutes);

module.exports = app;
