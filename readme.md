# Project Instructions

This repo is the code for the FEND capstone app.

## local setup

- execute `npm install` to setup the node modules for the project
- edit the `.env.example` file to add your secret API keys and rename it to `.env`
- execute `npm run build-prod` to create the dist folder with the bundled code for production

## npm script commands

- `npm run lint` to run the javascript code inside the `src` folder through ESlinter
- `npm test` to run jest tests on the javascript code inside the src folder. **This command concurrently runs the server on port 3000 which is required to use puppeteer**. Also, please ensure the dist folder is built to avoid any dom errors in Chromium.
- `npm run build-dev` to run the code inside the `scr/client` folder on the webpack-dev-server
- `npm run build-prod` to compile production code into the dist folder
- `npm start` to start the server on local port 3000 (or any other specified in your .env file)

## what the "travel planner" app does

The app allows you to select a city and a date for your upcoming trip and reports the forecasted weather conditions for the specified date, any active alerts notification for the location in the _present_ week and how many days until departure. A picture for the destination city or country is uploaded as well as a weather icon. Both location and date inputs are validated for correct format and spelling, even for browsers that do not support a datepicker like Safari IOS desktop.
The reported results are collected from three APIs: Geonames, DarkSky and Pixabay.
The app remembers the search and input data into localStorage and uploads the latest when the app is started unless it is cleared with the clear button.
These extra features are implemented:

- Pull in an image for the country from Pixabay API when the entered location brings up no results
- Allow the user to remove the trip.
- Use Local Storage to save the data so that when they close, then revisit the page, their information is still there.
- Incorporate icons into forecast.

## tests

Unit, integration and E2E tests are implemented with jest using various techniques, like matchers, snapshots, mock ups. Node server code is tested with supertest and the full stack is tested with puppeteer. The server is started in the file `start.js`, separate from the server code being tested to prevent "same port in use" errors with the supertest library. Puppeteer is configured with `headeless: false` to allow the browser simulation to run; you can change this setting in `main.test.js` to speed up the tests.

## proxy server

All APIs are accessed through a local proxy server to prevent CORS errors (i.e Dark Sky API) and/or to make use of environmental variables to protect secret access API credentials (all three APIs). Client to server parameters transmission is handled using express route parameters. I did not use the cors middleware because node-fetch in the server context ignores it - [ref here](https://github.com/bitinn/node-fetch/blob/HEAD/LIMITS.md).

## the app is deployed on Heroku

https://fendcapstone.herokuapp.com/
