const mongoose = require('mongoose');
const incomeSchema = mongoose.Schema({
    nameIncome :{type:String, require:true},
    valor : {type: Number, require:true},
    dateIncome: { type: Date, require: true}
})

module.exports = ("Income",incomeSchema);