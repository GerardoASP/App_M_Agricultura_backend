const mongoose = require('mongoose');
const incomeSchema = mongoose.Schema({
    nameIncome :{type:String, require:true},
    valueIncome : {type: Number, require:true},
    dateIncome: { type: Date, require: true},
    incomeLot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lot'
    },
    incomeSale:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sale'
    }
})

module.exports = mongoose.model("Income",incomeSchema);