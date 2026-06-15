require("dotenv").config();

const mongoose = require("mongoose");
const Country = require("./models/Country");

mongoose.connect(process.env.MONGO_URI);

const countries = [
  // Group A
  "Mexico", "South Africa", "Korea Republic", "Czechia",

  // Group B
  "Canada", "Bosnia and Herzegovina", "Qatar", "Switzerland",

  // Group C
  "Brazil", "Morocco", "Haiti", "Scotland",

  // Group D
  "United States", "Paraguay", "Australia", "Turkiye",

  // Group E
  "Germany", "Curacao", "Ivory Coast", "Ecuador",

  // Group F
  "Netherlands", "Japan", "Sweden", "Tunisia",

  // Group G
  "Belgium", "Egypt", "Iran", "New Zealand",

  // Group H
  "Spain", "Cape Verde", "Saudi Arabia", "Uruguay",

  // Group I
  "France", "Senegal", "Iraq", "Norway",

  // Group J
  "Argentina", "Algeria", "Austria", "Jordan",

  // Group K
  "Portugal", "DR Congo", "Uzbekistan", "Colombia",

  // Group L
  "England", "Croatia", "Ghana", "Panama"
];

(async () => {
  await Country.deleteMany();

  await Country.insertMany(
    countries.map(name => ({ name }))
  );

  console.log("Countries inserted");

  process.exit();
})();