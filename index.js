const express = require('express');
const app = express();
const cors = require('cors');
const yelpRoute = require('./yelpRoute');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/yelp', yelpRoute);

const port = process.env.PORT || 4500;

app.listen(port, ()=> console.log(`server started at ${port}`));