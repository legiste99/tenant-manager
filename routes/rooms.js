const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Tenant = require('../models/tenant');

// create a new room
router.post('/', async(request, response)=>{
    const room = new Room(request.body);
    try{
        await room.save();
        response.status(201).send(room);
    }catch (error){
        response.status(400).send(error);
    }
})

// get all rooms and populate tenant info
router.get('/', async (request, response) => {
    try {
        const rooms = await Room.find().populate('tenants');
        response.status(200).send(rooms);
    } catch (error) {
        response.status(500).send(error);
    }
})

module.exports = router;
