// start the server here to avoid port in use error when testing with jest and supertest
const app = require('./server.js');
app.listen(process.env.PORT || 3000);
