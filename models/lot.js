const mongoose = require('mongoose');
const lotSchema = mongoose.Schema({
    lotType :{type:String, require:true},
    area : {type: String, require:true},
    lotFarm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'farm'
    },
    lotProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }],
    lotSpents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'spent'
    }],
    lotSales:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sale'
    }]
})

module.exports = mongoose.model("Lot",lotSchema);