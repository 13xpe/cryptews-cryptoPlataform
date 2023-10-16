const express = require("express");
const axios = require("axios");

const API_KEY1 = "90c98836fd653fffdc75eec71574d690";
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

    const temperatures = [];
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

          const tempInKelvin = response.data["main"]["temp"];
          const tempInCelsius = Math.round(tempInKelvin - 273.15);
          temperatures.push({ city: CITY_NAME, temp: tempInCelsius });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    res.render("index", { title: "Homepage", blogs, humidities, temperatures });
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { title: "Error" });
  }
});

// Moved the '/converter' route outside the '/' route
app.get("/converter", (req, res) => {
  const num = req.query.num;
  const num1 = req.query.num1;
  const result = num / num1; // Perform your calculation here
  console.log(result);
  res.render("converter", { title: "Converter", result });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/converter", (req, res) => {
  res.render("converter", { title: "Converter" });
});

app.get("/price", (req, res) => {
  res.render("price", { title: "Price" });
});

app.get("/news", (req, res) => {
  res.render("news", { title: "News" });
});
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});


// Rest of your routes

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});