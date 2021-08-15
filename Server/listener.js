const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const {_getMessage} = require('./decryptTest');
const {sendData} = require('./emitter');

app.get('/', (req, res) => {
	res.send('Running');
});


io.on("connection", (socket) => {

    socket.emit("Welcome", `Hello, ${socket.id}`);
    console.log(`\nEmitter ${socket.id} has established the connection`);

    socket.on('sendMessage', async (data) => {
        console.log("\nReceived:", data);
        console.log("\nSenData:", sendData)
        console.log(data === sendData)
        await _getMessage(data)
    });

    socket.on('disconnect', () => console.log(`Emitter ${socket.id} has disconnection`));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));