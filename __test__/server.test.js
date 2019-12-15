const app = require('../src/server/server'); 
const supertest = require('supertest');
const request = supertest(app);
require('regenerator-runtime/runtime');

it('test the geonames proxy server route', async done => {
  const response = await request.get('/geonamesapi/milano');
  expect.assertions(3);
  expect(response).toMatchSnapshot();
  expect(response.status).toBe(200);
  expect(response.body.totalResultsCount).toBeGreaterThanOrEqual(1);
  done();
});

it('test the dark sky proxy server route', async done => {
  const response = await request.get('/darkskyapi/42.3601/-71.0589/255657600');
  expect.assertions(3);
  expect(response).toMatchSnapshot();
  expect(response.status).toBe(200);
  expect(response.body.forecast.daily.data.length).toBeGreaterThanOrEqual(1);
  done();
});

it('test the pixabay proxy server route', async done => {
  const response = await request.get('/pixabayapi/milano');
  expect.assertions(3);
  expect(response).toMatchSnapshot();
  expect(response.status).toBe(200);
  expect(response.body.totalHits).toBeGreaterThanOrEqual(1);
  done();
});
