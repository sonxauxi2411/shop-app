const express = require("express");
const app = express();

const cros = require("cors");
const mongoose = require("mongoose");
const donte = require("dotenv").config();
const router = require("./routers/index");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const MongoDbStore = require("connect-mongodb-session")(session);

app.use(express.json());
app.use(cookieParser());
const store = new MongoDbStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});
//cros kết nối front-end
app.use(
  cros({
    origin: [process.env.URL_CUSTOMER, process.env.URL_ADMIM],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
//send sesion
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false,
      maxAge: 86400000,
    },
    store: store,
  })
);

//router
app.use("/", router);

const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);

//connect to database
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
    //connect to socket
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("connected socket", socket.id);
      socket.on("send_message", (data) => {
        console.log(data);
        io.emit("receive_message", data);
      });
      socket.on("disconnect", () => {
        console.log("disconnected socket", socket.id);
      });
    });
  })
  .catch((err) => console.log(err));
