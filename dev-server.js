const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const fs = require("fs");
const path = require("path");

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const directory = "data";
const baseFileName = "grapesjs";

const PORT = process.env.PORT || 8000;

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// create data directory if it doesn't already exist
if (!fs.existsSync(path.join(__dirname,directory))) {
  console.log("Create new directory " + directory);
  fs.mkdirSync(path.join(__dirname,directory));
}


let filename = `${directory}/${baseFileName}-all.json`

app.get("/load-template", (req, res) => {

  if (!fs.existsSync(path.join(__dirname, directory))) {
    fs.loadFile(filename, (err, data) => {
      if (err) {
        console.log("Error reading file " + filename +err);
        res.status(500).json({ message: "server error, error reading file " + filename + " Error: " + err});
      } else {
        console.log("Read file " + filename);
        res.json(data);
      }
        
    });
  } else {
    console.log("ERROR - could not find file " + filename);
    res.status(500).json({ message: "server error, could not find file " + filename });
  }
});

app.post("/save-template", (req, res) => {

  fs.writeFile(filename, req.data, (err) => {
    if (err) {
      console.log("Error writing file " + filename);
      console.log(" Error: " + err);
      res.status(500).json({ message: "server error, error writing file " + filename + " Error: " + err });
    } else {
      console.log("Wrote file " + filename);
      res.json("Successful file write");
    }
  });
});

// Serve the files
app.listen(PORT, function () {
  console.log('Dev server listening on port ' + PORT + '\n');
});
