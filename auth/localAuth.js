/* incantations*/
var passport = require('passport');

var LocalStrategy = require('passport-local');
var User = require('../persistence/user.js');
var authConf = require('./authConf.js');
/* incantations*/


passport.use('local-auth', new LocalStrategy(authConf.local,

	function(req, email, password, done){

		process.nextTick(function(){


				User.findOne({'local.email' : email}, function(err, user){


						if(!user)//no such user
							return done(null, false, {message:'incorrect username'});

						
						if(!user.validPassword(password))
							return done(null, false, {message:'incorrect password'});

						return done(null, user);

				});


		});
	}


));