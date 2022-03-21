const mongoose=require('mongoose');
const {Schema}=require('mongoose');
const cartSchema=new mongoose.Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'customers' },
    items: [{ type: Schema.Types.ObjectId, ref: 'items' }],
    package:[{type:Schema.Types.ObjectId,ref:'packages'}] 

});
module.exports=mongoose.model("carts",cartSchema);