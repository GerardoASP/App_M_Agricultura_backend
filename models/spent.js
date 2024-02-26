const mongoose = require('mongoose');
const spentSchema = mongoose.Schema({
    nameSpent :{type:String, require:true},
    valor : {type: Number, require:true},
    dateSpent: { type: Date, require: true}
})

module.exports = ("Spent",spentSchema);