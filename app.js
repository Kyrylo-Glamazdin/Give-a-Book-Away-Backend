const express = require("express");
const app = express();
const db = require("./db");
const httpRouter = require("./routes/index.js");
const socketIo = require("socket.io");

//functions for resetting the db
const makeDatabase = require("./functions/makeDatabase");
const seedDatabase = require("./functions/seedDatabase");

//enable sockets
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const cors = require("cors");
const formatMessage = require("./functions/messages");

const PORT = 3500;

//socket actions
io.on("connection", (socket) => {
  //join chat room
  socket.on("joinRoom", (chatId) => {
    socket.join(chatId);
  });

  //leave chat room
  socket.on("leaveRoom", (chatId) => {
    socket.leave(chatId);
  });

  //update chat preview icons
  socket.on("iconUpdate", (messageObject) => {
    let formattedMessage = formatMessage(
      messageObject.id,
      messageObject.username,
      messageObject.lineText,
      messageObject.conversationId,
      messageObject.otherUserId
    );
    socket.broadcast.emit("updateRequired", formattedMessage);
    io.to(messageObject.conversationId).emit("message", formattedMessage);
  });
});

io.on("disconnect", (socket) => {
  socket.leave(chatId);
});

const syncDB = async () => {
  try {
    await db.sync({ force: false });
    //UNCOMMENT ONCE IF RESET

    // await db.sync({ force: true });
    // await seedDatabase();
  } catch (error) {
    //if local db doesn't exist, create and seed one
    if (error.name == "SequelizeConnectionError") {
      // await makeDatabase(); //uncomment if using local db
      await db.sync({ force: true });
      await seedDatabase();
    } else {
      console.log(error);
    }
  }
};

const utilities = async () => {
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", httpRouter);
  server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
};

//run the server
const start = async () => {
  await syncDB();
  await utilities();
};

start();
