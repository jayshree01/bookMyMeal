const express =require('express');
const customerController=require('../controller/customer.controller');

const router=express.Router();
router.get("/sendOtp/:email/:number/:name",customerController.sendOtp);
router.post("/ragistration",customerController.ragistrationByOtp);
router.post("/signin",customerController.customerSignIn);
module.exports=router;

