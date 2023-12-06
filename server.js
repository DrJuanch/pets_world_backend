require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const dataBaseConnection = require('./config/mongo');
const router = require('./src/v1/routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './src/uploads'
}));

router(app);

dataBaseConnection()
app.listen(PORT, () => {
  console.log('Connected to the PORT', PORT);
});
