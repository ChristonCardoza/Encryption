const crypto = require('crypto');
const {emitterSharedKey} = require('./security');

const _encryptMessage = (message) => {
    
    const data = JSON.stringify(message);

    const emitterIv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(emitterSharedKey, 'hex'), emitterIv);

    let encrypt = cipher.update(data, 'utf8', 'hex')
    encrypt += cipher.final('hex');

    const auth_tag = cipher.getAuthTag().toString('hex');
    const payload = emitterIv.toString('hex') + encrypt + auth_tag;
    const payload64 = Buffer.from(payload, 'hex').toString('base64');

    console.log('***************************************************************************************************');
    console.log('*                                    Sending Data                                                 *');
    console.log('***************************************************************************************************');
    console.table( {
        emmiter_iv: emitterIv.toString('hex'),
        emitter_encrypted: encrypt,
        emmiter_auth_tag: auth_tag,
        EncyptpayloadData: payload,
        Base64payloadData: payload64
    })
    return payload64;
}

module.exports={_encryptMessage}