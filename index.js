const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

// middleware

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

const port = 5000;

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

app.post("/uploads", uploads.array("files"), (req, res) => {
  console.log(req.body);
  console.log(req.files);
  res.send({
    msg: "files received",
    data: req.body,
    imgPath: `http://192.168.100.70:${port}/images/${req.files[0].originalname}`,
  });
});
