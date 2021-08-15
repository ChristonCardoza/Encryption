const io = require("socket.io-client");

const {_createMessage} = require('../utils/MessageSample');
const {_encryptMessage} = require('../Security/encryptMessage');


const _startEmitter = () => {

    const socket = io.connect("http://localhost:5000/");

    socket.on("Welcome", (data) => {
        console.log("Received:", data);
    });

    setInterval(async () =>{
        const message = await _createMessage();
        console.log('Message: ',message);
        sendData = await _encryptMessage(message);
        await socket.emit('sendMessage', sendData);
    }, 10000);
}

module.exports = { _startEmitter};