const validateForm = () => {
  const destination = document.getElementById('city').value;
  const date = document.getElementById('date').value;
  const dateReg = /^\d{4}([-])\d{2}\1\d{2}$/;
  let errorMessageDest = document.getElementById('destination-error');
  let errorMessageDate = document.getElementById('date-error');
  errorMessageDest.textContent =
    'Please enter a city name ex. Rome, NewYork,..';
  errorMessageDate.textContent =
    'Please enter a valid departing date in the format yyyy-mm-dd';
  // check both input fields are filled with proper formatted values with date is not in the past
  if (
    (destination === '' && date === '') ||
    (destination === '' && !date.match(dateReg)) ||
    (destination === '' && new Date(date) < new Date(new Date().toDateString()))
  ) {
    errorMessageDest.classList.remove('hide');
    errorMessageDate.classList.remove('hide');
  } else {
    // handle when only destination is not filled
    if (destination === '') {
      errorMessageDest.classList.remove('hide');
      errorMessageDate.classList.add('hide');
    } else {
      // handle when only date is not filled or bad format
      if (date === '' || !date.match(dateReg)) {
        errorMessageDate.classList.remove('hide');
        errorMessageDest.classList.add('hide');
      } else {
        // handle when date is not a valid date
        if (!(date instanceof Date) && isNaN(new Date(date))) {
          errorMessageDate.classList.remove('hide');
          errorMessageDest.classList.add('hide');
        } else {
          // handle when date is in the past
          if (new Date(date) < new Date(new Date().toDateString())) {
            errorMessageDate.classList.remove('hide');
            errorMessageDest.classList.add('hide');
          } else {
            // all good
            errorMessageDest.classList.add('hide');
            errorMessageDate.classList.add('hide');
            return [destination, date];
          }
        }
      }
    }
  }
};

export { validateForm };
