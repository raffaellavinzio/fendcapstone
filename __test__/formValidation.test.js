import { validateForm } from '../src/client/js/formValidation';

describe('test for validateForm function', () => {
  it('should show error date message when date is in the past', () => {
    document.body.innerHTML = `<input id="city" value="Milano"><input id="date" value="2019-12-12"><span id="destination-error" class="trip__error hide">Please enter a city name ex. Rome, NewYork,..</span><span id="date-error" class="trip__error hide">Please enter a valid departing date in the format yyyy-mm-dd</span>`;
    validateForm();
    expect(document.body.innerHTML).toBe(
      `<input id="city" value="Milano"><input id="date" value="2019-12-12"><span id="destination-error" class="trip__error hide">Please enter a city name ex. Rome, NewYork,..</span><span id="date-error" class="trip__error">Please enter a valid departing date in the format yyyy-mm-dd</span>`
    );
  });

  it('should show error date and location messages when fields are empty', () => {
    document.body.innerHTML = `<input id="city" value=""><input id="date" value=""><span id="destination-error" class="trip__error hide">Please enter a city name ex. Rome, NewYork,..</span><span id="date-error" class="trip__error hide">Please enter a valid departing date in the format yyyy-mm-dd</span>`;
    validateForm();
    expect(document.body.innerHTML).toBe(
      `<input id="city" value=""><input id="date" value=""><span id="destination-error" class="trip__error">Please enter a city name ex. Rome, NewYork,..</span><span id="date-error" class="trip__error">Please enter a valid departing date in the format yyyy-mm-dd</span>`
    );
  });

  it('should show error date message when date format is wrong', () => {
    document.body.innerHTML = `<input id="city" value="Milano"><input id="date" value="02-02-2020"><span id="destination-error" class="trip__error hide">Please enter a city name ex. Rome, NewYork,..</span><span id="date-error" class="trip__error">Please enter a valid departing date in the format yyyy-mm-dd</span>`;
    validateForm();
    expect(document.body.innerHTML).toBe(
      `<input id="city" value="Milano"><input id="date" value="02-02-2020"><span id="destination-error" class="trip__error hide">Please enter a city name ex. Rome, NewYork,..</span><span id="date-error" class="trip__error">Please enter a valid departing date in the format yyyy-mm-dd</span>`
    );
  });
});
