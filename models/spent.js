const mongoose = require('mongoose');
const spentSchema = mongoose.Schema({
    nameSpent :{type:String, require:true},
    valueSpent : {type: Number, require:true},
    dateSpent: { type: Date, require: true},
    spentLot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lot'
    },
    spentProduct:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
})

module.exports = mongoose.model("Spent",spentSchema);