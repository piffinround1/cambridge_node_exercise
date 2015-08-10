
var mongoose = require('mongoose');

var connectionString = 'mongodb://localhost/exercise';

mongoose.connect(connectionString);



var mongocon = {

	connection : connectionString,
	mongoose : mongoose

};


module.exports = mongocon;
