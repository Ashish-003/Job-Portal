const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ApplicationSchema = new Schema({
    Jobid:{
        type : String
    },
    jtitle:{
        type : String
    },
    recname:{
        type : String
    },
    salary:{
        type : Number
    },
    recmail:{
        type : String
    },
    appmail:{
        type: String
    },
    skills:{
        type:String
    },
    sop:{
        type: String
    },
    appname:{
        type: String
    },
    status:{
        type:String,
        default:"APPLIED"
    },
    appdate:{
        type:Date,
        default:Date.now
    },
    joindate:{
        type:Date
    },
    rating:{
        type:Number
    }
});
module.exports = Application = mongoose.model("application", ApplicationSchema);