const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const RedisStore = require("connect-redis").default
// const redis = require("redis");
const cors = require("cors");
const {createClient} = require("redis")

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT,  REDIS_URL,SESSION_SECRET,REDIS_PORT} = require("./config/config")

// Initialize client.
let redisClient = createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
    legacyMode: true,
  })
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

const app = express();


app.use(
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    httpOnly: true,
    maxAge: 30000,
  })
)


  
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");


// const path = require('path');






const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
    mongoose
       .connect(mongoURL, {useNewUrlParser: true,useUnifiedTopology: true,})
       .then(() => console.log("succesfully connected to DB"))
       .catch((e) => {console.log(e);setTimeout(connectWithRetry, 5000); });
  };

  connectWithRetry();

  //    FOR REDIS

  app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("<h2>Hi  There</h2>");
  console.log("yeah it ran");
});


app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
