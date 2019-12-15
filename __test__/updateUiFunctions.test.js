import { updateDaysCounter } from '../src/client/js/updateUiFunctions';

describe('tests for updateDaysCounter function', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div class="trip__info"></div>';
  });

  it("should set the counter to zero if today's date is entered", () => {
    updateDaysCounter('Roma', new Date(), 'Italy');
    expect(document.body.innerHTML).toBe(
      `<div class="trip__info">Your trip to <span class="capitalize">Roma</span>, Italy is 0 days away</div>`
    );
  });

  it("should set the counter to 1 if tomorrow's date is entered", () => {
    updateDaysCounter(
      'Roma',
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      'Italy'
    );
    expect(document.body.innerHTML).toBe(
      `<div class="trip__info">Your trip to <span class="capitalize">Roma</span>, Italy is 1 days away</div>`
    );
  });
});
