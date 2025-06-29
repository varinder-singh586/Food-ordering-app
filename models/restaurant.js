const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const RestaurantModel = new Schema({
    name: {
        type: String,
        default: "",
        trim: true,
    },
    phone: {
        type: Number,
        default: "",
        trim: true,
    },
    address: {
        type: String,
        default: "",
        trim: true,
    },
    openingTime: {
        type: String,
        default: "",
        trim: true,
    },
    closingTime: {
        type: String,
        default: "",
        trim: true,
    },
},{ timestamps: true })

const resto = mongoose.model('restaurant', RestaurantModel);
module.exports = resto;