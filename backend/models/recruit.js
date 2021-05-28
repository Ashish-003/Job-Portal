const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruitSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	usertype:{
		type:String,
		default:'recruiter'
	},	
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	},
	contact:{
		type:String,
		required:true
	},
	bio:{
		type:String,
		required:true
	},
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = Recruiter = mongoose.model("recruiter", RecruitSchema);
