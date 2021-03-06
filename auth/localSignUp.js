/* incantations*/
var passport = require('passport');

var LocalStrategy = require('passport-local');
var User = require('../persistence/user.js');

/* incantations*/

passport.use('local-signup', new LocalStrategy({


	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true


},

	function(req, email, password, done){

		process.nextTick(function(){


				User.findOne({'local.email' : email}, function(err, user){


						if(user)//email taken
							return done(null, false, req.flash('msg', 'Whoops, username taken.....'));

						var newUser = new User();

						newUser.local.email = email;
						newUser.local.password = newUser.generateHash(password);

						newUser.save(function(err, user){

							if(err)
								throw err;


							return done(null, user);

						});

				});


		});
	}


));