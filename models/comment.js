var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = Schema({
	text:{
		type: String,
		required: true,
	},
	date:{
		type: String,
		required: true
	},
	user:{
		type: String,
		required: true,
		unique:true
	},
	artwork:{
		type:String,
		required:true,
	},
});

module.exports = mongoose.model("comment",CommentSchema);
