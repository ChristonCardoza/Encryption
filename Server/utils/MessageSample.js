const crypto = require('crypto');
const {names, cities} = require('./data.json');


const _createMessage = () => {
    const originalMessage = {
        name:  names[Math.floor(Math.random() * names.length)],
        origin: cities[Math.floor(Math.random() *cities.length)],
        destination: 'Mumbai'
    }
    let secrete_key = crypto.createHash('sha256').update(JSON.stringify(originalMessage)).digest('hex');
    originalMessage['secrete_key'] = secrete_key;
    return originalMessage;
}

module.exports = {_createMessage};