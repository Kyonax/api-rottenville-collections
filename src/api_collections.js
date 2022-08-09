//Declarations Files
const Exe = require("../tools/functions");
//Declarations Repositories
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
//Declaration Dotenv
require("dotenv").config();

//Express Configuation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "public"));

//Methods Init
//GET Method Collectio
const testing = () => {
  console.log(process.env.TESTING);
};

testing();
