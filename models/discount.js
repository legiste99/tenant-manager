const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    tenant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    recurring: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Discount', discountSchema);
