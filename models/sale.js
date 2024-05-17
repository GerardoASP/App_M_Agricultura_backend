const mongoose = require('mongoose');
const saleSchema = mongoose.Schema({
    nameSale :{type:String, require:true},
    quantity: {type:String, require:true},
    unitSale : {type:String, require:true},
    valueSale : {type: Number, require:true},
    dateSale: { type: Date, require: true},
    saleLot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lot'
    }
})

module.exports = mongoose.model("Sale",saleSchema);