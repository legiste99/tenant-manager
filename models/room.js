const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    room_number: {
        type: String,
        required: true,
        unique: true
    },
    tenants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tenant'
        }
    ]
})

module.exports = mongoose.model('Room', roomSchema);
