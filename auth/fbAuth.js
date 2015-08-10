

var passport = require('passport');
var passportFbStrategy = require('passport-facebook').Strategy;


passport.use(new passportFbStrategy({
    clientID: '1658069641104488',
    clientSecret: '428197b7633c8413134bb5f00265e450',
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    enableProof: false,
    profileFields: ['id', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(JSON.stringify(profile));
      return done(err, profile);
    
  }
));



var fbAuth = {

	authenticate : passport.authenticate('facebook')
	

}


module.exports = fbAuth;