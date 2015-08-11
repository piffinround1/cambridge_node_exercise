/* incantations*/
var passport = require('passport');
var TwitterStrategy  = require('passport-twitter').Strategy;
var authConf = require('./authConf.js');
var User = require('../persistence/user.js');

/* incantations*/



passport.use( new TwitterStrategy(authConf.twitter,

	function(token, tokenSecret, profile, done) {


		process.nextTick(function(){

			User.findOne({'twitter.id': profile.id}, function(err, user){


				if(err)
					throw err

				if(user)
					return done(null, user);

				var newUser = new User();

				newUser.twitter.id = profile.id;
				newUser.twitter.displayName = profile.displayName;
				newUser.twitter.username = profile.username;
				newUser.twitter.token = profile.token;

				newUser.save(function(err){

					if(err)
						throw err;

					return done(null, newUser);
				});


			});

		});

	}


));

