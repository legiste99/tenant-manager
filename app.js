const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const roomsRouter = require('./routes/rooms');
const receiptsRouter = require('./routes/receipts');
const discountsRouter = require('./routes/discounts');
const tenantsRouter = require('./routes/tenants');
const paymentsRouter = require('./routes/payments');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tenant-management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/rooms', roomsRouter);
app.use('/tenants', tenantsRouter);
app.use('/payments', paymentsRouter);
app.use('/receipts', receiptsRouter);
app.use('/discounts', discountsRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
