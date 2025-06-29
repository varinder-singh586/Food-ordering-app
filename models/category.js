const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categoryModel = new Schema({
    name: {
        type:String,
        default: "",
        trim: true,
    },
}, {timestamps: true })

const category = mongoose.model('category', categoryModel)
module.exports = category
