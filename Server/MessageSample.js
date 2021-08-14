const crypto = require('crypto');

const originalMessage = {
    name: 'Jack Reacher',
    origin: 'Bengaluru',
    destination: 'Mumbai'
}

let secrete_key = crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex');
originalMessage['secrete_key'] = secrete_key;

module.exports = originalMessage;