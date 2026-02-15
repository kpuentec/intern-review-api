require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO).then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`);
    });
})
    .catch((e) => {
        console.error("DB connection error:", e);
});