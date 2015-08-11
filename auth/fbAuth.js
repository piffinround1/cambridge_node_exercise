
/* incantations*/
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../persistence/user.js');
var authConf = require('./authConf.js');
/* incantations*/



passport.use(new FacebookStrategy(authConf.facebook,
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



    



