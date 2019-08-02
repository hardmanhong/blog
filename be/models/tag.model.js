const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TagSchema = new Schema({
    name: {type:String,required:true,max:15},
    color: {type:String,required:true,max:7},
})
module.exports =  mongoose.model('Tag',TagSchema);