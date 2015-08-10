var mongocon = require('./mongocon.js');

var mongoose = mongocon.mongoose;


var userSchema = new mongoose.Schema({

	id  : String,
	username: String,
	password: String,

});




var userModel = mongoose.model('user', userSchema);

var userDao = {

	checkLogin: function(user,callback){
		console.log('passing thru checkLogin' + JSON.stringify(user));
		userModel.find(user).exec(function(err, data){
			callback(err,data);
		});
	


	},

	showAllUsers : function(callback){
		userModel.find({}).lean().exec(function(err, data){

			console.log(data);
		});

	}


}


module.exports = userDao;


