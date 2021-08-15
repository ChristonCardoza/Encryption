const mongoose = require('mongoose');
const timeseries = require('mongoose-timeseries');

const MessageSchema = mongoose.Schema({

    messages: [{
        name: { type: String },
        origin: { type: String },
        destination: { type: String },
        secrete_key: { type: String },
        receivedAT:{ type: Date }
    }],
    startDate: Date,
    endDate: Date
});

// MessageSchema.plugin(timeseries, {
//     target: 'UploadedMSG',
//     dateField: 'date',
//     resolutions: ['minute'],
//     key: {
//         messages:1
//     },
//     // data: {
//     //     source: 'secrete_key'
//     // }  
// });

module.exports = mongoose.model('UploadedMSG', MessageSchema);