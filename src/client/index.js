import './styles/main.scss';

import './media/darkskylogo.svg';
import './media/geonameslogo.svg';
import './media/pixabaylogo.svg';

import { validateForm } from './js/formValidation';
import {
  parseGeonamesData,
  parseDarkSkyData,
  parsePixabayData,
  getApiData
} from './js/apiFunctions';
import {
  updateDaysCounter,
  updateResults,
  init,
  clear
} from './js/updateUiFunctions';
import './js/main.js';

// make available through Client library
export {
  parseGeonamesData,
  parseDarkSkyData,
  parsePixabayData,
  getApiData,
  validateForm,
  updateDaysCounter,
  updateResults,
  init,
  clear
};
