const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const multer = require("multer");

const app = express();

app.set("view engine", "ejs");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var dir = "./uploads";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).array("files", 12);

app.post("/upload", (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    res.status(200).json({ request });
  });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(8080, () => {
  console.log("connected to port 8080");
});
