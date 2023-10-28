const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");
const cors = require("cors");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config");

// Initialize Express app.
const app = express();

// Enable trust proxy and configure middleware.
app.enable("trust proxy");
app.use(cors({}));
app.use(
    session({
        store: new RedisStore({
            client: createClient({
                host: REDIS_URL,
                port: REDIS_PORT,
            }),
            prefix: "myapp:",
        }),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000,
    })
);

app.use(express.json());

// Define routes
app.get("/api/v1", (req, res) => {
    res.send("<h2>Hi  There</h2>");
    console.log("yeah it ran");
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

// Connect to MongoDB
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Successfully connected to DB");
            // Start the server after successfully connecting to the database
            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        })
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 5000);
        });
};

// Connect Redis client
const redisClient = createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
    legacyMode: true,
});
redisClient.connect().catch(console.error);

connectWithRetry();
