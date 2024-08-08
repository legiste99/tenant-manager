const express = require('express');
const router = express.Router();
const Discount = require('../models/discount');
const Tenant = require('../models/tenant');

// record a new discount
router.post('/', async (request, response) => {
    const discount = new Discount(request.body);
    try {
        await discount.save();

        // update tenant's total discount
        const tenant = await Tenant.findById(discount.tenant_id);
        if (!tenant) {
            response.status(404).send({error: 'Tenant not found'});
        }
        tenant.total_discount += discount.amount;
        await tenant.save()

        response.status(201).send({discount, tenant});
    } catch (error) {
        response.status(400).send(error);
    }
})

// get all discounts
router.get('/', async (request, response) => {
    try {
        const discounts = await Discount.find();
        response.status(200).send(discounts);
    } catch (error) {
        response.status(500).send(error);
    }
})

module.exports = router;
