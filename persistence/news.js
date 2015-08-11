/* incantations*/
var mongocon = require('./mongocon.js');

/* incantations*/
var mongoose = mongocon.mongoose;


var newsSchema = new mongoose.Schema({

	title: String,
	description: String,
	creator : String

});


newsSchema.methods.assignCreator = function(req){	
	this.creator = req.user._id;
};


module.exports = mongoose.model('new', newsSchema);

