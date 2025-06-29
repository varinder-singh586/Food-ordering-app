const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const adminModel = new Schema({
    name: {
        type: String,
        default: "",
        trim: true,
    },
    password: {
        type: String,
        default: "",
        trim: true,
    },
    email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        default: "",
        trim: true,
    },
    token:
        { type: String },
}, { timestamps: true })


const admin = mongoose.model('admin', adminModel)
module.exports = admin;