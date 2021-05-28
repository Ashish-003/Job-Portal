const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const educationSchema = new Schema({
	instiName:{
		type:String
	},
	
});
const ApplicantSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	usertype:{
		type:String,
		default:'applicant'
	},	
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	rating:{
		type:Number,
		default: 0,
		required:false
	},
	instiName:{
		type:[String]
	},
	starty:{
		type:[String]
	},
	endy:{
		type:[String]
	},
	open_app:{
		type:Number,
		default:0
	},
	skills:{
		type:String
	},
	num:{
		type:Number,
		default : 0,
		required:false
	},
	img:{
		Data:Buffer,
		type:String
	},
	iswork:{
		type:String,
		default:"false"
	},
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = Applicant = mongoose.model("applicant", ApplicantSchema);
