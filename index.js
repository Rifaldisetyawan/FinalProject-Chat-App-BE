const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/userRoutes");
const messageRoutes = require("./Routes/messageRoutes");
const app = express();
const socket = require("socket.io");
const { patch } = require("./Routes/userRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`${process.env.MONGO_URL},DB Connetion Successfull`);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

app.use(express.static(path.join(__dirname,"/Final project/chat-app/build")))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Final project/chat-app/buildindex.html'));
});

const server = app.listen(process.env.PORT||5000, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "https://storied-malasada-799161.netlify.app/",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
