const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const reviewRoutes = require('./routes/reviewRoutes');

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use('/api/reviews', reviewRoutes);


app.get('/', (request, response) => {
    response.json({ message: "API is Running"});
});

module.exports = app;