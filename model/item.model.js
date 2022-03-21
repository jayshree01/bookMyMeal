const mongoose = require('mongoose');
const { Schema } = mongoose;
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        trim: true,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true,
        min: 1
    },
    itemImageUrl: {
        type: String,
        required: true,

    },

    itemDiscount: {
        type: Number,
        default: 0
    },
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories' }



});


module.exports = mongoose.model("items", itemSchema);