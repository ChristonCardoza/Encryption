const crypto = require('crypto');
const {listenerSharedKey} = require('./security');

const _getMessage = ( encryptedData) => {
    
    const listener_payload = Buffer.from(encryptedData, 'base64').toString('hex');
    const listener_iv= listener_payload.substr(0, 32);
    const listener_encrypted = listener_payload.substr(32, listener_payload.length - 64);
    const listener_auth_tag = listener_payload.substr(listener_payload.length - 32, 32)
    
    console.table({
        received_msg64 : encryptedData,
        received_msg: listener_payload,
        listener_iv,
        listener_encrypted,
        listener_auth_tag
    });

    try {
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            Buffer.from(listenerSharedKey, 'hex'),
            Buffer.from(listener_iv, 'hex')
        );

        decipher.setAuthTag(Buffer.from(listener_auth_tag, 'hex'));

        let decrypted = decipher.update(listener_encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        console.log('\nDecrypted Message:', decrypted);
    }catch( error){
        console.log(error.message)
    }
}

module.exports={_getMessage}