const express = require("express");
const axios = require("axios");

const API_KEY = "185ba549-ae8b-4606-b1b1-58b05f85ae68";
const API_KEY1 = "90c98836fd653fffdc75eec71574d690";

const crypto_names= ["Bitcoin"];
const cities = ["Toronto", "Montreal", "London", "Paris", "Rome", "Vancouver", "Ottawa"];

const app = express();
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const blogs = [
      { title: "Blog 1", snippet: "Lorem ipsum dolor sit amet consectetur" },
      { title: "Blog 2", snippet: "Lorem ipsum dolor sit amet consectetur" },
      { title: "Blog 3", snippet: "Lorem ipsum dolor sit amet consectetur" },
    ];

    const prices = [];
    const humidities = [];

    for (let i = 0; i < cities.length; i++) {
      const CITY_NAME = cities[i];
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY1}`
        )
        .then((response) => {
          const humidity = response.data["main"]["humidity"];
          humidities.push({ city: CITY_NAME, hum: humidity });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    for (let i = 0; i < crypto_names.length; i++) {
      const CRYPTO_NAME = crypto_names[i];
      await axios
        .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
          headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
          },
          params: {
            symbol: 'BTC',
          }
        })
        .then((response) => {
          const price = response.data.data.BTC.quote.USD.price;
          prices.push({ name: CRYPTO_NAME, price: price });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    res.render("index", { title: "Homepage", blogs, prices, humidities });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { title: "Error" });
  }
});

// Moved the '/converter' route outside the '/' route
// Your other routes go here

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
