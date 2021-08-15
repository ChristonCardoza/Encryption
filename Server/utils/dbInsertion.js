const schemaModal = require('../models/messages');

const _insertMessage = async(messages) => {
    const dbData = { 
        messages,
        startDate: messages[0].receivedAT,
        endDate: messages[messages.length -1].receivedAT
    };
    
    const newMessage = new schemaModal(dbData);

    try {
        await newMessage.save();
        console.log("\nSuccessfully message has been inserted into DB")      
    } catch (err) {
        console.log("\nError While inserting the message :", err);
    }
}

module.exports = {_insertMessage};