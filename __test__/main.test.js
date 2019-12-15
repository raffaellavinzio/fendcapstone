require('regenerator-runtime/runtime');
const puppeteer = require('puppeteer');
import '../src/client/js/main.js';

describe('integration test for main callback function', () => {
  it('should return the correct text in the search results for city=Milano, date=today', async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: ['--window--size=1000,1200']
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.type('input#city', 'Milano');
    await page.type('input#date', new Date().toLocaleDateString());
    await page.click('button#submit'), await delay(4000);
    await page.screenshot({
      fullPage: true,
      path: '../fendcapstone/__test__/screenshots/screenshot_ok.png'
    });
    const element = await page.$('.trip__info');
    const text = await page.evaluate(element => element.textContent, element);
    expect(text).toBe('Your trip to Milano, Italy is 0 days away');
    await browser.close();
  }, 20000);

  it('should return the correct error messages for empty inputs', async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 80,
      args: ['--window--size=1000,1200']
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.type('input#city', '');
    await page.type('input#date', '');
    await page.click('button#submit'), await delay(4000);
    await page.screenshot({
      fullPage: true,
      path: '../fendcapstone/__test__/screenshots/screenshot_error.png'
    });
    const destErr = await page.$('#destination-error');
    const dateErr = await page.$('#date-error');

    const dateErrText = await page.evaluate(
      dateErr => dateErr.textContent,
      dateErr
    );
    const destErrText = await page.evaluate(
      destErr => destErr.textContent,
      destErr
    );
    expect(dateErrText).toBe(
      'Please enter a valid departing date in the format yyyy-mm-dd'
    );
    expect(destErrText).toBe('Please enter a city name ex. Rome, NewYork,..');
    await browser.close();
  }, 20000);
});
