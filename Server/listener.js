const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const {_startEmitter} = require('./Socket/emitter');
const {_decryptMessage} = require('./Security/decryptMessage');
const {_insertMessage} = require('./utils/dbInsertion');

app.get('/', (req, res) => {
	res.send('Running');
});

const TotalMessage = [];
let currentTime = new Date();
currentTime.setMinutes( currentTime.getMinutes() + 1 );

io.on("connection", (socket) => {

    socket.emit("Welcome", `Hello, ${socket.id}`);
    console.log(`\nEmitter ${socket.id} has established the connection`);

    socket.on('sendMessage', (data) => {

        let decrypted = JSON.parse(_decryptMessage(data));
        decrypted['receivedAT'] = new Date();

        let initialTime = decrypted.receivedAT;

        if( initialTime <= currentTime){
            TotalMessage.push(decrypted)
        } else{
            _insertMessage(TotalMessage);
            TotalMessage.splice(0, TotalMessage.length)
            TotalMessage.push(decrypted)
            currentTime = decrypted.receivedAT;
            currentTime.setMinutes( currentTime.getMinutes() + 1 );
        }
       
    });

    socket.on('disconnect', () => console.log(`Emitter ${socket.id} has disconnection`));
});

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;


// Connect to DB
mongoose.connect(process.env.CONNECTION_URL,
    {useNewUrlParser: true,useUnifiedTopology: true}, 
    (err) => {
        if (!err) {
            console.log('Successfully Established Connection with MongoDB');
        }
        else {
            console.log('Failed to Establish Connection with MongoDB with Error: '+ err);
        }
    }
);

// Establish Server
server.listen(PORT,
    (err) => { 
        if(!err){
            console.log(`Successfully Established  Server having port ${PORT}`);
        }
        else{
            console.log('Failed to Establish Server with Error: '+ err)
        }
    }
);
_startEmitter();