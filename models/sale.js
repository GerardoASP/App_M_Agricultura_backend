const mongoose = require('mongoose');
const saleSchema = mongoose.Schema({
    nameSale :{type:String, require:true},
    valor : {type: Number, require:true},
    dateSale: { type: Date, require: true}
})

module.exports = ("Sale",saleSchema);