const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use('/moderator', express.static(path.join(__dirname, 'moderator'))); // Serve the 'moderator' folder under the '/moderator' route

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('login', (data) => {
      console.log(`data send`);
        io.emit('login', data);
    });

    socket.on('changeScreen', (screen) => {
        io.emit('changeScreen', screen);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const moderatorIO = io.of('/moderator');

moderatorIO.on('connection', (socket) => {
    console.log('Moderator connected');

    socket.on('message', (message) => {
        console.log('Message from moderator:', message);
        io.emit('messageToUsers', message); // Emit the message to all users
    });

    socket.on('disconnect', () => {
        console.log('Moderator disconnected');
    });

    // Add other moderator-specific event listeners here
});




// const publicIO = io.of('/public');

// publicIO.on('connection', (socket) => {
//     console.log('public connected');

//     socket.on('message', (message) => {
//         console.log('Message from public:', message);
//         io.emit('messageToModerator', message); // Emit the message to all users
//     });

//     socket.on('disconnect', () => {
//         console.log('public disconnected');
//     });

//     // Add other moderator-specific event listeners here
// });

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
