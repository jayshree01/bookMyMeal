const express =require('express');
const customerController=require('../controller/customer.controller');

const router=express.Router();
router.post("/signup",customerController.customerSignup);

module.exports=router;