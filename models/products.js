const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const productModule = new Schema({
    restaurantId: {
        type: mongoose.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
        required: true
    },
    name: {
        type: String,
        default: "",
        trim: true,
    },
    price: {
        type:Number,
        default: 1,
    },
},{ timestamps: true })
const product = mongoose.model('product', productModule)
module.exports = product

