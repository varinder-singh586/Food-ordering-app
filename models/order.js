const Constants = require("../utility/constant");
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const orderModel = new Schema({
    productsId: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        default: 1,
    },
    status: {
        type: Number,
        enum: Object.values(Constants.ORDER_STATUS),
        default: Constants.ORDER_STATUS.Pending
    },
}, { timestamps: true })
const order = mongoose.model('order', orderModel)
module.exports = order