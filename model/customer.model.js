const mongoose=require('mongoose');
const {Schema}=mongoose;
const customerSchema= new mongoose.Schema({
    customerName:{
        type:String,
        trim:true,
        required:true
    },
    customerEmail:{
        type:String,
        trim:true,
        required:true,
        
    }

});

module.exports=mongoose.model("customers",customerSchema);