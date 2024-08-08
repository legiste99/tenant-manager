const express = require('express');
const router = express.Router();
const Receipt = require('../models/receipt');
const Payment = require('../models/payment');
const Tenant = require('../models/tenant');

// get all receipts
router.get('/', async (request, response) => {
    const payment = new Payment(request, response)
    try {
        console.log('Nothing happens here')
    } catch (error) {
        response.status(400).send(error);
    }
})

module.exports = router;
