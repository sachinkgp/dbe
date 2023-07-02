const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const schemaOrder = new mongoose.Schema({
    order_name: [],
    order_quantity : [],
    order_live: { type: Boolean },
    order_status: { type: String },
    order_address: { type: String },
    order_city: { type: String },
    ordered_by: {type:ObjectId,ref:"User"},
    fullfilled_by: { type: ObjectId, ref: "User" },
})

mongoose.model("Order", schemaOrder);