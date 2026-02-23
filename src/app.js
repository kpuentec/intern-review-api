const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const reviewRoutes = require('./routes/reviewRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const { globalLimiter } = require('./middleware/rateLimiter');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
app.set('trust proxy', 1);


app.use(cors());
app.use(express.json());
app.use(globalLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorHandler);


app.get('/', (request, response) => {
    response.json({ message: "API is Running"});
});

module.exports = app;