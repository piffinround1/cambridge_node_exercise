/* incantations*/
var passport = require('passport');
var User = require('../persistence/user.js');
var fbAuth = require('./fbAuth.js');
var localSignUp = require('./localSignUp.js');
var localAuth = require('./localAuth.js');
var idmAuth = require('./idmAuth.js');
var twitterAuth = require('./twitterAuth.js');
/* incantations*/


passport.serializeUser(function(user, done) {
        done(null, user._id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
            done(err, user);
    });
});

var auth = {

	checkIfLoggedIn : function(req, res, next){

		if(req.isAuthenticated())
			return next();

		res.redirect("/");

	}
	


};






module.exports = auth;
