const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    nameProduct :{type:String, require:true},
    purpose : {type:String, require:true},
    variety: { type: String, require: true},
    weather: { type: String, require: true},
    postHarvestTime: { type: String, require: true },
    harvestTime: { type: String, require: true },
    weight: { type: String, require: true},
    volume: { type: String, require: true},
    sowingDate:{type:Date, default:Date.now()},
    productLot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lot'
    },
    productSpents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spent'
    }]
})

module.exports = mongoose.model("Product",productSchema);