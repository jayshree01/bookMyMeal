const mongoose=require('mongoose');
const {Schema}=require('mongoose');
const orderSchema=new mongoose.Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'customers' },
    items:[{
        item: { type: Schema.Types.ObjectId, ref: 'items' }
         ,itemQuantity:{
             type:Number,
             default:1
         }     
    } 
    ],
    packages:[{
        package: { type: Schema.Types.ObjectId, ref: 'packages' }
         ,packageQuantity:{
             type:Number,
             default:1
         }     
    } 
    ],
    orderAddress:{
        type:String,
        required:true,
        trim:true
    },
    orderMobileNumber:{
        type:Number,
        required:true,
        trim:true
    },
    totalAmount:{
        type:Number,
        required:true
    }


});

module.exports=mongoose.model("customerOrders",orderSchema);