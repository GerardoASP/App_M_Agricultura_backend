const mongoose = require('mongoose')
const publicationSchema=mongoose.Schema({
    title: { type: String},
    active: { type: Boolean, default: true },
    avatar: { type: [String]},
    description: {type: String},
    typePublication: {type: String},
    datePublication: { type: Date, default:Date.now()},
    author:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Users" 
    },
});
  
module.exports = mongoose.model('Publication', publicationSchema);