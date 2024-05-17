const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstname :{type:String, require:true},
    lastname : {type:String, require:true},
    email: { type: String, require: true, unique: true},
    phone: { type: String, require: true, unique: true},
    password: { type: String, require: true },
    document_type: { type: String, require: true },
    document: { type: String, require: true, unique: true},
    active: { type: Boolean, require: true, default: false },
    userPublications: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Publication" 
    }],
    userFarms:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Farm"
    }],
    verifyCode:{ type:String}
})

module.exports = mongoose.model("User",userSchema);