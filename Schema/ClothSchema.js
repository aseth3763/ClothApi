const mongoose = require("mongoose")
require("../Database/db")
const SchemaCloth = new mongoose.Schema({
    brand_name : {
        type : String,
        required : true,
        unique : true
    },
    color : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    }
}, {timestamps:true})

const ClothModel = mongoose.model('ClothModel',SchemaCloth);

module.exports = ClothModel;