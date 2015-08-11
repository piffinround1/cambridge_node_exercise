

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../persistence/user.js');
var auth = require('./auth.js');

passport.use(new FacebookStrategy({
    clientID: '1658069641104488',
    clientSecret: '428197b7633c8413134bb5f00265e450',
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
      
      process.nextTick(function(){
         

          User.findOne({'facebook.id' : profile.id}, function(err, user){

              if(err)
                  return done(err);


              if(user)
                return done(null, user)
              
                var newUser = new User();

                console.log(JSON.stringify(profile));
                newUser.facebook.id    = profile.id;              
                newUser.facebook.token = profile.token;          
                newUser.facebook.name  = profile.displayName;
                if(profile.emails)
                  newUser.facebook.email = profile.emails[0].value;

                newUser.save(function(err){

                  if(err)
                    throw err;

                  return done(null, newUser);
                });


          });

     

      });

    }
));


passport.serializeUser(function(user, done) {
        done(null, user._id);
});


passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
            done(err, user);
    });
});
    



