import { validateForm } from '../js/formValidation';
import {
  parseGeonamesData,
  parseDarkSkyData,
  parsePixabayData,
  getApiData
} from '../js/apiFunctions';
import { updateResults, init, clear } from '../js/updateUiFunctions';

window.addEventListener('DOMContentLoaded', event => {
  init();
  document.getElementById('submit').addEventListener('click', main);
  document.getElementById('clear').addEventListener('click', clear);
});

const main = async event => {
  event.preventDefault();
  try {
    const [city, date] = validateForm();
    if ([city, date] !== ['undefined', 'undefined']) {
      let geonamesOutObj = await getApiData(
        `/geonamesapi/${city}`,
        parseGeonamesData
      );
      if (typeof geonamesOutObj !== 'undefined') {
        const time = parseInt((new Date(date).getTime() / 1000).toFixed(0));
        const darkSkyOutObj = await getApiData(
          `/darkskyapi/${geonamesOutObj.lat}/${geonamesOutObj.long}/${time}`,
          parseDarkSkyData
        );
        let picUrl = await getApiData(`/pixabayapi/${city}`, parsePixabayData);
        if (picUrl === 'undefined') {
          picUrl = await getApiData(
            `/pixabayapi/${geonamesOutObj.country}`,
            parsePixabayData
          );
        }
        updateResults(
          city,
          date,
          geonamesOutObj.country,
          darkSkyOutObj,
          picUrl
        );
        // update localStorage with latest search data
        let itemsArray = [
          city,
          date,
          geonamesOutObj.country,
          darkSkyOutObj,
          picUrl
        ];
        localStorage.setItem('items', JSON.stringify(itemsArray));
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export { main };
