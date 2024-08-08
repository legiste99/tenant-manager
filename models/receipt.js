const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
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
    generated_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        required: true
    }
})

module.exports = mongoose.model('Receipt', receiptSchema);
