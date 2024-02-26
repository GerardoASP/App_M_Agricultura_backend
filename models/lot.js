const mongoose = require('mongoose');
const lotSchema = mongoose.Schema({
    lotType :{type:String, require:true},
    area : {type: Number, require:true},
})

module.exports = ("Lot",lotSchema);