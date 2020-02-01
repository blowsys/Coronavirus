'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const constants = require('../../constants');

async function getData (url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.features.map(e => {
      delete e.attributes.OBJECTID;
      return e.attributes;
    });
  } catch (error) {
    throw new Error(error);
  }
};

router.get('/', async (req, res) => {
  res.json({ result: await getData(constants.app.api.countriesAPI) });
});

router.get('/:id', async (req, res) => {
  const countriesData = await getData(constants.app.api.countriesAPI);
  const countryData = countriesData.find(e => e['Country_Region']);
  res.json({ result: countryData });
});

module.exports = router;
