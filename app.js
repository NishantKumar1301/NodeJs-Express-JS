const path = require("path");
const express = require("express");

const defaultRoute = require("./routes/default");
const restaurantRoute = require("./routes/restaurant");

const app = express();

app.set("views", path.join(__dirname, "views")); //for setting it in to ejs file:Which generates html
app.set("view engine", "ejs");

app.use(express.static("public")); //==> For acessing the styles and java script files

app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoute); // localhost:3000/==> First it will come to this file and below
app.use("/", restaurantRoute);

app.use(function (req, res) {
  // It will execute if we are entering different path of the routes
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  //It will execute if the server fails to load the resources
  res.status(500).render("500");
});

app.listen(3000);
