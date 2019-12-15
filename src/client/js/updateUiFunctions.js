// clear localStorage data and uploads default page
const clear = () => {
  localStorage.clear();
  init();
};

// update screen with init results from local storage or default
const init = () => {
  let itemsArray;
  // set logo icon
  const skycons = new Skycons({ color: 'pink' });
  skycons.add(document.getElementById('icon-logo'), 'PARTLY_CLOUDY_DAY');
  skycons.play();
  // clear form and error messages
  let errorMessageDest = document.getElementById('destination-error');
  let errorMessageDate = document.getElementById('date-error');
  errorMessageDest.classList.add('hide');
  errorMessageDate.classList.add('hide');
  document.querySelector('form').reset();

  if (localStorage.getItem('items') === null) {
    itemsArray = [];
    // set default background picture
    document.querySelector('.trip__picture').src =
      'https://cdn.pixabay.com/photo/2017/06/17/18/35/background-2413081_1280.jpg';
    // clear results section
    document.querySelector('.trip__info').innerHTML = '';
    document.getElementById('icon').classList.add('hide');
    document.getElementById('text').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('alert').innerHTML = '';
  } else {
    // set page defaults to localStorage values
    itemsArray = JSON.parse(localStorage.getItem('items'));
    document.getElementById('city').value = itemsArray[0];
    document.getElementById('date').value = itemsArray[1];
    updateResults(...itemsArray);
  }
};

// calculate and display days to elapse until trip date
const updateDaysCounter = (city, date, country) => {
  const trip = document.querySelector('.trip__info');
  let counter = Math.round(
    (new Date(date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
  );
  //avoids -1 for same day trips
  if (counter < 0) {
    counter = 0;
  }
  trip.innerHTML = `Your trip to <span class="capitalize">${city}</span>, ${country} is ${counter} days away`;
};

// update screen with selected API results
const updateResults = (city, date, country, darkSkyOutObj, picUrl) => {
  // display counter
  updateDaysCounter(city, date, country);
  // display city or country picture from Pixabay
  document.querySelector('.trip__picture').src = picUrl;
  // display weather icon and related text from Dark Sky
  const skycons = new Skycons({ color: '#177575' });
  if (darkSkyOutObj.hasOwnProperty('icon')) {
    document.getElementById('icon').classList.remove('hide');
    skycons.add(document.getElementById('icon'), darkSkyOutObj.icon);
    skycons.play();
    document.getElementById('text').textContent = darkSkyOutObj.icon
      .split('-')
      .join(' ');
    // or show error message if no icon data found
  } else {
    document.getElementById('icon').classList.add('hide');
    document.getElementById('text').textContent = 'sorry, no data';
  }
  // display high/low temperatures from Dark Sky
  if (
    darkSkyOutObj.hasOwnProperty('high') &&
    darkSkyOutObj.hasOwnProperty('low')
  ) {
    document.getElementById(
      'temperature'
    ).innerHTML = `High ${darkSkyOutObj.high} F<br>Low ${darkSkyOutObj.low} F`;
    // display this week alerts with link to alert page from Dark Sky
    if (darkSkyOutObj.alertTitle) {
      document.getElementById(
        'alert'
      ).innerHTML = `<a href=${darkSkyOutObj.alertUri}>${darkSkyOutObj.alertTitle}</a>`;
      // or show no alerts info if none found
    } else {
      document.getElementById(
        'alert'
      ).innerHTML = `<span>No meteo alerts this upcoming week</span>`;
    }
    // or show error message if no temperature data found
  } else {
    if (document.getElementById('text').textContent !== 'sorry, no data') {
      document.getElementById('temperature').textContent = 'SORRY, NO DATA';
    } else {
      document.getElementById('temperature').textContent = '';
    }
  }
};

export { updateDaysCounter, updateResults, init, clear };
