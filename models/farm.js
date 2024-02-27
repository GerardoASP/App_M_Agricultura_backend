const mongoose = require('mongoose');
const farmSchema = mongoose.Schema({
    nameFarm :{type:String, require:true},
    lineFarm : {type:String, require:true},
    area: { type: Number, require: true},
    predialValue: { type: Number, require: true},
    services: { type: [String], required: true },
    farmUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model("Farm",farmSchema);