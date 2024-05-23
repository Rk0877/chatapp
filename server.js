const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('chatMessage', (msg) => {
    io.to(msg.room).emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// server.js
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const Message = require('./models/Message');

// dotenv.config();
// connectDB();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Update this to your frontend's origin
//   },
// });

// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Send existing messages to the connected user
//   Message.find().sort({ timestamp: 1 }).then((messages) => {
//     socket.emit('loadMessages', messages);
//   });

//   socket.on('sendMessage', async (messageData) => {
//     console.log('Message received:', messageData);
//     const message = new Message({
//       sender: messageData.sender,
//       recipient: messageData.recipient,
//       message: messageData.message,
//       timestamp: new Date(),
//     });
//     await message.save();
//     io.emit('message', message); // Broadcast to all connected clients
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// server.listen(5000, () => {
//   console.log('Server running on port 5000');
// });
