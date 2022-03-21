const { strict } = require('is-typedarray');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'items' }],
    packageImageUrl: {
        type: String,
        required: true
    },
    packageUses: {
        type: String,
        required: true
    },
    packageDescription: {
        type: String,
        required: true
    },
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories' }
});


module.exports = mongoose.model("packages", packageSchema);