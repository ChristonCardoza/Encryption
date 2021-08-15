const mongoose = require('mongoose');

const schemaModal = require('../models/messages');

const getMessages = async(req,res) => {
    try{
        const messages = await schemaModal.find();

        res.status(200).json(messages);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
}

module.exports = getMessages
