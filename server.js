require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const dataBaseConnection = require('./config/mongo');
const router = require('./src/v1/routes/index');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", router );
app.use('*', (req, res) => {
    res.status(404)
    res.send({ error: 'Estas aquí' })
})

dataBaseConnection()
app.listen(PORT, () => {
  console.log('Connected to the PORT', PORT);
});
