const app = require('express')();
const server = require('http').createServer(app);
const crypto = require('crypto');
const io = require('socket.io')(server);

const {listenerSharedKey, cipher} = require('./security');
app.get('/', (req, res) => {
	res.send('Running');
});

const _getMessage = ( encryptedData) => {
    
    const listener_payload = Buffer.from(encryptedData, 'base64').toString('hex');

    // Extract the fields from received message (<iv><encryptedMessage><auth>)
    const listener_iv= listener_payload.substr(0, 32);
    const listener_encrypted = listener_payload.substr(32, listener_payload.length - 64);
    const listener_auth_tag = listener_payload.substr(listener_payload.length - 32, 32).toString('hex');

    console.log("listener_iv: ",listener_iv);
    console.log("listener_encrypted: ",listener_encrypted);
    console.log("listener_auth_tag: ", listener_auth_tag)

    try {
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            Buffer.from(listenerSharedKey, 'hex'),
            Buffer.from(listener_iv, 'hex')
        );
    
        decipher.setAuthTag(Buffer.from(listener_auth_tag, 'hex'));

        let decrypted = decipher.update(listener_encrypted, 'hex', 'utf8');
        // decrypted += decipher.final('utf8');
  
        console.log('Decrypted Message:', decrypted);   
    }catch( error){
        console.log(error.message)
    }
}

io.on("connection", (socket) => {

    socket.emit("Welcome", `Hello, ${socket.id}`);
    console.log(`Emitter ${socket.id} has established the connection`);

    socket.on('sendMessage', (data) => {
        console.log("Received:", data);
        _getMessage(data)
    });

    socket.on('disconnect', () => console.log(`Emitter ${socket.id} has disconnection`));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));