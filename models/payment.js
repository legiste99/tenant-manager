const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    tenant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    amount_paid: {
        type: Number,
        required: true
    },
    payment_date: {
        type: Date,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    receipt_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receipt'
    }
})

module.exports = mongoose.model('Payment', Schema);
