const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,'..',"data", "restaurant.json");//'..' will leads you to the project folder of the directory,hence by ".." only, we can go to the folder

function getStoredRestaurant() {
  const fileData = fs.readFileSync(filePath);
  const storedrestaurant = JSON.parse(fileData);
  return storedrestaurant;
}

function storeRestaurants(storedrestaurant) {
  fs.writeFileSync(filePath, JSON.stringify(storedrestaurant));
}

module.exports = {
  getStoredRestaurant: getStoredRestaurant,
  storeRestaurants: storeRestaurants,
}; // for exporting this to another file.Note that for easy purpose name of variable and name of function should be same;
