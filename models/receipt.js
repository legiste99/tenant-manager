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
    },
    amount_due: {
        type: Number,
        required: true
    },
    paid_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    payment_month: {
        type: Number, // month as a number (1-12)
        required: true
    },
    payment_year: {
        type: Number, // year
        required: true
    }
})

module.exports = mongoose.model('Receipt', receiptSchema);
