const serverless = require("serverless-http");
const express = require("express");
const cors = require('cors');
const app = express();
//Personal Codes
const Exe = require("./tools/functions")

require("dotenv").config();
app.use(cors());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "API: Key not found - Root Error",
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/collections", async (req,res) => {
  let json = await Exe.readJSON(process.env.ADDRESS)
  let _jsonTemporal = JSON.parse(json);

  for(var i in _jsonTemporal){
    delete _jsonTemporal[i].minted_nfts;
    if (_jsonTemporal[i].collection_structure){
      delete _jsonTemporal[i].collection_structure;
    }
  }

  return res.status(200).json({
    data: _jsonTemporal,
  })
})

app.get('/collection/:name', async (req,res) => {
  let json = await Exe.readJSON(process.env.ADDRESS);
  let _jsonTemporal = JSON.parse(json)[req.params.name];

  return res.status(200).json({
    data: _jsonTemporal,
  })
})

app.get('/collection/:name/:attribute', async (req,res) => {
  let json = await Exe.readJSON(process.env.ADDRESS);
  let _jsonTemporal = JSON.parse(json)[req.params.name][req.params.attribute];

  return res.status(200).json({
    data: _jsonTemporal,
  })
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
