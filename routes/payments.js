const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const Receipt = require('../models/receipt');
const Tenant = require('../models/tenant');
const Room = require('../models/room');

// record a new payment and generate a receipt
router.post('/', async (request, response)=>{
    const payment = new Payment(request.body);
    try {
        // save payment
        await payment.save();

        // find tenant to get monthly rent and outstanding amount
        const tenant = await Tenant.findById(payment.tenant_id);
        if (!tenant) {
            response.status(404).send({error: 'Tenant not found'});
        }

        // find room to get all tenants
        const room = await Room.findById(tenant.room_id).populate('tenants');
        if (!room) {
            response.status(404).send({error: 'Room not found'});
        }

        // calculate total due for the payment month
        const total_due_for_month = room.tenants.reduce((acc, t) => acc + t.monthly_rent, 0);
        let remaining_amount_due = total_due_for_month - payment.amount_paid;

        // check if tenants has an outstanding amount for the same month
        let previous_payments = await Payment.find({
            tenant_id: tenant._id,
            payment_month: payment.payment_month,
            payment_year: payment.payment_year
        })

        let total_previous_payments = previous_payments.reduce((acc, p) => acc + p.amount_paid, 0);
        remaining_amount_due -= total_previous_payments;

        /*// calculate the total due for all tenants in the room (second way)
        const total_due = room.tenants.reduce((acc, tenant) => acc + tenant.monthly_rent, 0);
        const amount_due = total_due - payment.amount_paid;*/

        /*// calculate new outstanding amount (first way)
        const total_amount = tenant.monthly_rent + tenant.outstanding_amount;
        const amount_due = total_amount - payment.amount_paid;
        tenant.outstanding_amount = amount_due > 0 ? amount_due : 0;*/

        // update outstanding amount for each tenant in the room
        const newOutstandingAmount = remaining_amount_due > 0 ? remaining_amount_due/ room.tenants.length : 0;
        for (let t of room.tenants) {
            t.outstanding_amount = newOutstandingAmount;
            await tenant.save();
        }

        // generate receipt
        const receipt = new Receipt({
            tenant_id: payment.tenant_id,
            amount_paid: payment.amount_paid,
            payment_date: payment.payment_date,
            generated_date: payment.payment_date,
            status: remaining_amount_due > 0 ? 'Partial' : 'Paid',
            amount_due: newOutstandingAmount,
            paid_by: payment.tenant_id,
            payment_month: payment.payment_month,
            payment_year: payment.payment_year
        })
        await receipt.save();

        // update payment with receipt id
        payment.receipt_id = receipt._id;
        await payment.save();

        response.status(201).send({payment, receipt});

    } catch (error) {
        response.status(400).send(error);
    }
})

module.exports = router;
