const io = require("socket.io-client");

const message = require('./MessageSample');
const {emitterIv, cipher} = require("./security");

let socket = io.connect("http://localhost:5000/");

console.log('Message',message);

const _setPayload = () => {
      
    let encrypt = cipher.update(JSON.stringify(message), 'utf8', 'hex')
    encrypt += cipher.final('hex');
    const auth_tag = cipher.getAuthTag().toString('hex');
    const payload = emitterIv.toString('hex') + encrypt + auth_tag;
    const payload64 = Buffer.from(payload, 'hex').toString('base64');

    // console.log("emmiter_iv: ",emitterIv.toString('hex'));
    // console.log("emitter_encrypted: ",encrypt);
    // console.log("emmiter_auth_tag: ", auth_tag)

    console.log("The payloadData: ",payload64);
    return payload64;
}

const sendData = _setPayload();

socket.on("Welcome", (data) => {
    console.log("Received:", data);
});

socket.emit('sendMessage', sendData);












// TODO: Sample Decrypted data

// const crypto = require('crypto');
// const {listenerSharedKey} = require('./security');

// const _getMessage = ( encryptedData) => {
    
//     const listener_payload = Buffer.from(encryptedData, 'base64').toString('hex');
//     const listener_iv= listener_payload.substr(0, 32);
//     const listener_encrypted = listener_payload.substr(32, listener_payload.length - 64);
//     const listener_auth_tag = listener_payload.substr(listener_payload.length - 32, 32)
    
//     console.log("listener_iv: ",listener_iv);
//     console.log("listener_encrypted: ",listener_encrypted);
//     console.log("listener_auth_tag: ", listener_auth_tag)

//     try {
//         const decipher = crypto.createDecipheriv(
//             'aes-256-gcm',
//             Buffer.from(listenerSharedKey, 'hex'),
//             Buffer.from(listener_iv, 'hex')
//         );

//         decipher.setAuthTag(Buffer.from(listener_auth_tag, 'hex'));

//         let decrypted = decipher.update(listener_encrypted, 'hex', 'utf8');
//         decrypted += decipher.final('utf8');

//         console.log('Decrypted Message:', decrypted);
//     }catch( error){
//         console.log(error.message)
//     }
// }

// _getMessage(sendData)