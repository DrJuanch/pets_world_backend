require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3030;
const dataBaseConnection = require('./config/mongo');
const router = require('./src/v1/routes/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})) //
router(app);

dataBaseConnection()
app.listen(PORT, () => {
  console.log('Connected to the PORT', PORT);
});
