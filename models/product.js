const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    nameProduct :{type:String, require:true},
    purpose : {type:String, require:true},
    variety: { type: String, require: true},
    weather: { type: String, require: true},
    postHarvestTime: { type: Number, require: true },
    preHarvestTime: { type: Number, require: true },
    weight: { type: Number, require: true},
    volume: { type: Number, require: true},
})

module.exports = ("Product",productSchema);