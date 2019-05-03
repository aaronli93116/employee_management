const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");
const url = "mongodb://localhost:27017/employee_management";
const connect = mongoose.connect(url, { useNewUrlParser: true });
const port = process.env.PORT || 8888;

connect.then(
  db => {
    console.log("Connected correctly to server");
  },
  err => {
    console.log(err);
  }
);
const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(userRouter);

app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
