const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bodyParser = require("body-parser");

let data = fs.readFileSync("db.json");
let users = JSON.parse(data);

console.log(users);

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API",
  });
});

app.get("/api/getUser", verifyToken, (req, res) => {
  console.log(req.header);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (email) {
    const user = users.user.find((user) => user.email === email);
    if (user != undefined) {
      if (user.password === password) {
        jwt.sign({ user }, "secretkey", (err, token) => {
          res.json({
            token,
          });
        });
      } else {
        res.send("Password invalde.");
      }
    } else {
      res.send("User name invalde.");
    }
  } else {
    res.sendStatus(403);
  }
});

function check(item) {
  if (item !== undefined && item !== null && item !== "") {
    return true;
  }
  return false;
}

app.post("/api/createUser", (req, res) => {
  var id = Math.random();
  let user = req.body;
  console.log(user);
  if (check(user.user) && check(user.password) && check(user.email)) {
    user.id = id.toString(36).substr(2, 9);
    user.role = "user";
    users.user.push(req.body);
    let data = JSON.stringify(users, null, 2);
    fs.writeFile("db.json", data, finished);
    function finished(err) {
      console.log("error");
    }
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server started on port 5000"));
