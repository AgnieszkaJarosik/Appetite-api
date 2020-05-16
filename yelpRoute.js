const express = require('express');
const router = express.Router();
const axios = require('axios');

const fetchYelp = ( term, location, sort_by, price, open_now ) => {
  const apiKey = process.env.API_KEY;
  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sort_by}&price=${price}&open_now=${open_now}`;
  console.log(url);
  return axios({
    method: 'get',
    url: url,
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
    .then( resp => {
      return resp.data;
    });
}

router.get('/', async (req, res) => {
  try {
    const { term="restaurant", location, sort_by="best_match", price="1", open_now=false } = req.query;
    const data = await fetchYelp( term, location, sort_by, price, open_now );
    res.json(data);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

module.exports = router;