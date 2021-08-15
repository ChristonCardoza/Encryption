const crypto = require('crypto');

const listener = crypto.createECDH('secp256k1');
listener.generateKeys()

const emitter = crypto.createECDH('secp256k1');
emitter.generateKeys()

const listenerPublicKey64 = listener.getPublicKey().toString('base64');
const emitterPublicKey64 = emitter.getPublicKey().toString('base64');

const listenerSharedKey = listener.computeSecret(emitterPublicKey64, 'base64', 'hex');
const emitterSharedKey = emitter.computeSecret(listenerPublicKey64, 'base64', 'hex');

module.exports = {
    listenerSharedKey,
    emitterSharedKey
}