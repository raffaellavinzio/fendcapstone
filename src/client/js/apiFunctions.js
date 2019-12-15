// helper function to fetch and parse data from all the APIs
const getApiData = async (path, parseData) => {
  try {
    const res = await fetch(path);
    const data = await res.json();
    return parseData(data);
  } catch (e) {
    console.log(e);
  }
};

// function to parse date returned by Geonames API
const parseGeonamesData = data => {
  let errorMessageDest = document.getElementById('destination-error');
  errorMessageDest.textContent =
    'Please enter a valid city name ex. Rome, New York,..';
  errorMessageDest.classList.add('hide');
  if (data.totalResultsCount > 0) {
    const cityObj = {
      country: data.geonames[0].countryName,
      lat: data.geonames[0].lat,
      long: data.geonames[0].lng
    };
    return cityObj;
  } else {
    // throw error when geonames API returns undefined
    errorMessageDest.classList.remove('hide');
    throw new Error('invalid city name entered');
  }
};

// function to parse date returned by Dark Sky API
const parseDarkSkyData = weatherData => {
  let parsedWeatherData = {};
  // check needed data exists and parse accordingly
  if (
    weatherData.forecast.daily.data.length !== 0 &&
    weatherData.forecast.daily.data[0].hasOwnProperty('icon') &&
    weatherData.forecast.daily.data[0].hasOwnProperty('temperatureHigh') &&
    weatherData.forecast.daily.data[0].hasOwnProperty('temperatureLow')
  ) {
    parsedWeatherData = {
      high: weatherData.forecast.daily.data[0].temperatureHigh,
      low: weatherData.forecast.daily.data[0].temperatureLow,
      icon: weatherData.forecast.daily.data[0].icon
    };
  }
  // handle the parsing when only icon data is missing
  if (
    !weatherData.forecast.daily.data[0].hasOwnProperty('icon') &&
    weatherData.forecast.daily.data[0].hasOwnProperty('temperatureHigh') &&
    weatherData.forecast.daily.data[0].hasOwnProperty('temperatureLow')
  ) {
    parsedWeatherData = {
      high: weatherData.forecast.daily.data[0].temperatureHigh,
      low: weatherData.forecast.daily.data[0].temperatureLow
    };
  }
  // handle the parsing of alert data when available
  if (typeof weatherData.alerts.alerts !== 'undefined') {
    parsedWeatherData.alertTitle = weatherData.alerts.alerts[0].title;
    parsedWeatherData.alertUri = weatherData.alerts.alerts[0].uri;
  }
  return parsedWeatherData;
};

// function to parse date returned by Pixabay API
const parsePixabayData = data => {
  if (parseInt(data.totalHits) > 0) {
    let rand = Math.floor(Math.random() * data.hits.length);
    let locationImageUrl = data.hits[rand].webformatURL;
    return locationImageUrl;
  } else {
    return 'undefined';
  }
};

export { getApiData, parseGeonamesData, parseDarkSkyData, parsePixabayData };
