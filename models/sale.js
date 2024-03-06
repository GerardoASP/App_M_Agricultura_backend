const mongoose = require('mongoose');
const saleSchema = mongoose.Schema({
    nameSale :{type:String, require:true},
    valueSale : {type: Number, require:true},
    dateSale: { type: Date, require: true},
    saleProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
})

module.exports = mongoose.model("Sale",saleSchema);