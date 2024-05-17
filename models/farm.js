const mongoose = require('mongoose');
const farmSchema = mongoose.Schema({
    nameFarm :{type:String, require:true},
    lineFarm : {type:String, require:true},
    area: { type: String, require: true},
    predialValue: { type: String, require: true},
    services: { type: [String], required: true },
    farmUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    farmLots:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Lots"
    }]
})

module.exports = mongoose.model("Farm",farmSchema);