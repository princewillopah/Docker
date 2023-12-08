const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const RedisStore = require("connect-redis").default
// const redis = require("redis");
const cors = require("cors");
const {createClient} = require("redis")
// let RedisStore = require("connect-redis")(session);
// const RedisStore = require("connect-redis");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT,  REDIS_URL,SESSION_SECRET,REDIS_PORT} = require("./config/config")
// let redisClient = redis.createClient({
//     host: REDIS_URL,
//     port: REDIS_PORT,
//     legacyMode: true,
//   });
// Initialize client.
let redisClient = createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
    legacyMode: true,
  })
redisClient.connect().catch(console.error)
console.log(redisClient)
// Initialize store.
// let redisStore = new RedisStore({
//     client: redisClient,
//     prefix: "myapp:",
//   })


const app = express();

// Initialize sesssion storage.
app.use(
    session({
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "keyboard cat",
    })
  )

// app.use(
//     session({
//       store: new RedisStore({ client: redisClient }),
//       secret: SESSION_SECRET,
//       cookie: {
//         secure: false,
//         resave: false,
//         saveUninitialized: false,
//         httpOnly: true,
//         maxAge: 30000,
//       },
//     })
//   );
  
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");


// const path = require('path');





// mongoose
// .connect("mongodb://princewillopah:PRINCEWILL1980@mongo:27017/?authSource=admin")
// .then(()=> console.log("successful connctedto DB"))
// .catch((e)=>console.log(e))

// const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/?authSource=admin`;

// const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// mongoose
//         .connect(mongoURL, {useNewUrlParser: true,useUnifiedTopology: true,})
//         .then(() => console.log("succesfully connected to DB"))
//         .catch((e) => {console.log(e);}
// );

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



// app.use(express.static(path.join(__dirname)));
//localhost:3000/api/v1/post/
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
