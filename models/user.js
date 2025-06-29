const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userModel = new Schema({
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
        lowercase:true,
    },
    phone: {
        type: Number,
        default: "1",
    },
    token: 
    { type: String }
}, { timestamps: true })
const user = mongoose.model('user', userModel);
module.exports = user;

