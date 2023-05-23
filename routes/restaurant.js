const express = require("express");
const fs = require("fs");

const router = express.Router();
const uuid = require("uuid"); // importing the uuid package to generate a id after installation

const resData = require("../util/restaurant-data"); //Importing the package generated by me inside the util folder
//  ../ is used to indicate the file is at one level higher in the poject folder
router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurant = req.body;

  restaurant.id = uuid.v4(); //for assigning unique id for each single entry

  const storedrestaurant = resData.getStoredRestaurant(); //importing the function from the retsuarant-data for reading

  storedrestaurant.push(restaurant);

  resData.storeRestaurants(storedrestaurant); //importing the function from the retsuarant-data for writing

  res.redirect("/confirm");
});

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order != "asc" && order != "desc") {
    order = "asc";
  }

  if (order == "desc") {
    nextOrder = "asc";
  }
  const storedrestaurant = resData.getStoredRestaurant();

  storedrestaurant.sort(function (resA, resB) {
    if (
      (order == "asc" && resA.name > resB.name) ||
      (order == "desc" && resA.name < resB.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurant: storedrestaurant.length,
    Restaurants: storedrestaurant,
    nextOrder:nextOrder,
  });
  //Note : Restaurants refer to the name which is created in restaurant.ejs file inside the for loop and it refers to the storedrestaurant;
});

//Dynamic routes

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id; // params : Is used to finding the id

  const storedrestaurant = resData.getStoredRestaurant();

  for (const restaurant of storedrestaurant) {
    if (restaurant.id == restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
      //first restaurant refers to restaurant defined on restaurant-detail.ejs
      //second restaurant refers to the term defined inside the for loop
    }
  }

  res.status(404).render("404"); // if restaurant.id!=restaurantId
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
