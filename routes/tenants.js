const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Tenant = require('../models/tenant');

// create a new tenant and add tenant Id tot the room
router.post('/', async (request, response)=>{
    const tenant = new Tenant(request.body);
    try{
        await tenant.save();
        await Room.findByIdAndUpdate(tenant.room_id, {
            $push:{
                tenants: tenant._id
            }
        })
        response.status(201).send(tenant);
    }catch (error) {
        response.status(400).send(error);
    }
})

// get all tenants and populate room info
router.get('/', async (request, response)=>{
    try{
        const tenants = await Tenant.find().populate('room_id');
        request.status(200).send(tenants);
    }catch (error){
        response.status(400).send(error);
    }
})

module.exports = router;
