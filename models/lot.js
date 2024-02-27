const mongoose = require('mongoose');
const lotSchema = mongoose.Schema({
    lotType :{type:String, require:true},
    area : {type: Number, require:true},
    lotFarm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'farm'
    },
    lotProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
})

module.exports = mongoose.model("Lot",lotSchema);