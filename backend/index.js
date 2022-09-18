const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./routes/postRoutes");
const userRoute = require("./routes/userRoutes");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");

const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
let redisClient = createClient({
  host:REDIS_URL,
  port:REDIS_PORT
 })
 (async () => {
  await redisClient.connect();
})();

client.on('connect', () => console.log('::> Redis Client Connected'));
client.on('error', (err) => console.log('<:: Redis Client Error', err));

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

const username = "kravi43500";
const password = "password@";
const CONNECTION_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  console.log(CONNECTION_URL);
    mongoose
      .connect(CONNECTION_URL, {
        useUnifiedTopology: true,
      })
      .then(() => console.log("Successfully connected"))
      .catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry,5000);
      });
  };
  

connectWithRetry();
app.get("/", (req, res) => {
  res.send("<h1>Hello world!!!</h1>");
  res.end();
});
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie:{
    secure:false,
    resave:false,
    saveUnintialized:false,
    httpOnly:true,
    maxAge:30000
  }
}))
app.use("/api/v1/posts",postRoute)
app.use("/api/v1/users",userRoute)

app.listen(PORT, () => {
  console.log(`Listening server at port :${PORT}`);
});
