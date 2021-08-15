const io = require("socket.io-client");
let auth_tag;
const message = require('./MessageSample');
const {emitterIv, cipher} = require("./security");

let socket = io.connect("http://localhost:5000/");

console.log('Message',message);

const _setPayload = () => {
    
    const data = JSON.stringify(message);

    let encrypt = cipher.update(data, 'utf8', 'hex')
    encrypt += cipher.final('hex');

    auth_tag = cipher.getAuthTag().toString('hex');
    const payload = emitterIv.toString('hex') + encrypt + auth_tag;
    const payload64 = Buffer.from(payload, 'hex').toString('base64');


    console.table( {
        emmiter_iv: emitterIv.toString('hex'),
        emitter_encrypted: encrypt,
        emmiter_auth_tag: auth_tag,
        EncyptpayloadData: payload,
        Base64payloadData: payload64
    })
    return payload64;
}

const sendData = _setPayload();

socket.on("Welcome", (data) => {
    console.log("Received:", data);
});


socket.emit('sendMessage', sendData);

module.exports = {sendData}
