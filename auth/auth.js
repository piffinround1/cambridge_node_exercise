

var fbAuth = require('./fbAuth.js');
var localSignUp = require('./localSignUp.js');
var localAuth = require('./localAuth.js');


var auth = {

	checkIfLoggedIn : function(req, res, next){

		if(req.isAuthenticated())
			return next();

		res.redirect("/");

	}
	


};






module.exports = auth;
