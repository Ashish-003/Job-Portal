const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
    title: {
		type: String,
		required: true
    },
    recname:{
        type:String
    },
    recmail:{
        type:String
    },
    num_app:{
        type : Number,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    pos_left:{
        type:Number,
        required:false
    },
    applied:{
        type:Number,
        default:0,
        required:false
    },
    jobtype:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:0,
        required:false
    },
    num_rat:{
        type:Number,
        default:0,
        required:false
    },
    status:{
        type:String,
        default:"active"
    },
    appstatus:{
        type:String,
        default:"lul"
    },
    time:{
        type:Date,
        required:false
    },
    date:{
        type:Date,
        default:Date.now

    }
});
module.exports = Job = mongoose.model("job", JobSchema);
