const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const nodemailer = require('nodemailer');
const customerRouter=require('./router/customer.router')
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:I1uLeszDpPBxHovp@cluster0.gffjq.mongodb.net/bookMyMeal?retryWrites=true&w=majority', () => {
    console.log("Database Connection Stablished")
});

const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(customerRouter);
app.listen(3000,()=>{
    console.log("server is Running");
});