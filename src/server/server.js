const dotenv = require('dotenv').config();
/* Express to run server and routes */
const express = require('express');
const fetch = require('node-fetch');
/* instantiate app */
const app = express();

/* MIDDLEWARE */
// Parses the text as URL encoded data (which is how browsers tend
// to send form data from regular forms set to POST) and exposes
// the resulting object (containing the keys and values) on req.body
app.use(express.urlencoded({ extended: true }));
// Parses the text as JSON and exposes the resulting object on req.body.
app.use(express.json({ limit: '1mb' }));

/* initialize website folder to connect server and client side */
app.use(express.static('dist'));

//app.listen(process.env.PORT || 3000);

// geonames API
app.get('/geonamesapi/:city', async (request, response) => {
  let city = request.params.city;
  let url = `http://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${process.env.GEO_USERNAME}`;
  const res = await fetch(url);
  const geonamesData = await res.json();
  response.json(geonamesData);
});

// proxy server for DarkSky API
app.get('/darkskyapi/:lat/:long/:time', async (request, response) => {
  let lat = request.params.lat;
  let long = request.params.long;
  let time = request.params.time;
  let forecastUrl =
    'https://api.darksky.net/forecast/' +
    process.env.DS_API_KEY +
    `/${lat},${long},${time}?exclude=currently,minutely,hourly,flags`;
  let alertsUrl =
    'https://api.darksky.net/forecast/' +
    process.env.DS_API_KEY +
    `/${lat},${long}?exclude=currently,minutely,hourly,flags,daily`;
  let darkskyData = {};
  const forecastResponse = await fetch(forecastUrl);
  const alertsResponse = await fetch(alertsUrl);
  const forecast = await forecastResponse.json();
  const alerts = await alertsResponse.json();
  darkskyData.forecast = forecast;
  darkskyData.alerts = alerts;
  response.json(darkskyData);
});

// pixabay API
app.get('/pixabayapi/:location', async (request, response) => {
  let location = request.params.location;
  let url =
    'https://pixabay.com/api/?key=' +
    process.env.PIX_API_KEY +
    '&q=' +
    encodeURIComponent(location) +
    '&image_type=photo&category=nature,backgrounds,places,travel,buildings';
  const res = await fetch(url);
  const data = await res.json();
  response.json(data);
});

module.exports = app;
