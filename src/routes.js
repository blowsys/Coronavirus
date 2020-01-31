const app = require('express')();
const routes = require('./api');

app.use('/world', routes.WorldAPI);
app.use('/countries', routes.CountriesAPI);

module.exports = app;
