const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    response.json({ message: "API is Running"});
});

module.exports = app;