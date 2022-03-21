const express = require('express');
const client = require('twilio')('AC8d3ddfa8db351b55246b1ed2d8df1bdc', 'eaedb28056ce169f41b7f37b61b96dda');
const categoryRouter = require('./router/category.router');
const itemRouter = require('./router/item.router');
const packageRouter = require('./router/package.router');
const cartRouter=require('./router/cart.router');


const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const nodemailer = require('nodemailer');
const customerRouter = require('./router/customer.router')
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const { createRequire } = require('module');
const { Client } = require('twilio/lib/twiml/VoiceResponse');
mongoose.connect('mongodb+srv://root:I1uLeszDpPBxHovp@cluster0.gffjq.mongodb.net/bookMyMeal?retryWrites=true&w=majority', () => {
    console.log("Database Connection Stablished")
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'Happyholi'
}));
app.use(express.static(path.join(__dirname, "public")));
app.use('/cart',cartRouter);
app.use('/item', itemRouter);
app.use('/package', packageRouter);
app.use("/category", categoryRouter);
app.use(customerRouter);


app.listen(3000, () => {
    console.log("server is Running");
});