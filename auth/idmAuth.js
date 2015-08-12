var passport = require('passport');
var PasswordGrantStrategy = require('./idmAuthStrategy.js');
var User = require('../persistence/user.js');
var auntConf = require('./authConf.js');

passport.use(new PasswordGrantStrategy(auntConf.idm,
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
         

          User.findOne({'idm.id' : profile.id}, function(err, user){

              if(err)
                  return done(err);


              if(user)
                return done(null, user)
              
                var newUser = new User();
                newUser.idm.id    = profile.id;              
                newUser.idm.username = profile.username;          
                
                newUser.save(function(err){

                  if(err)
                    throw err;

                  return done(null, newUser);
                });


          });

     

      });

  }
));





module.exports = function(){

	return function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        passport.authenticate('password-grant', {
            username: username,
            password: password,
            failureRedirect: '/',
            successRedirect: '/idmauthsuccess'
        })(req, res, next);
    };
};



