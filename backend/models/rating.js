const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RatingSchema = new Schema({
    recmail:{
        type : String
    },
    appmail:{
        type: String
    },
    appflag:{
        type:Boolean,
        default:false
    },
    recflag:{
        type:Boolean,
        default:false
    }
});
module.exports = Rating = mongoose.model("rating", RatingSchema);