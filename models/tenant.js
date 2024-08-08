const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    move_in_date: {
        type: Date,
        required: true
    },
    monthly_rent: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Tenant', tenantSchema);
