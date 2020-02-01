'use strict';

const express = require('express');
const router = express.Router();
const axios = require('axios');
const constants = require('../../constants');

router.get('/', async (req, res) => {
  async function getData (url) {
    try {
      const response = await axios.get(url);
      const data = response.data;
      return data.features[0].attributes.value;
    } catch (error) {
      throw new Error(error);
    }
  };

  const stat = {
    Deaths: await getData(constants.app.api.deathsAPI),
    Confirmed: await getData(constants.app.api.confirmedAPI),
    Recovered: await getData(constants.app.api.recoveredAPI)
  };

  res.json({result: stat});
});

module.exports = router;
