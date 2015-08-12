
var passwordGrantStrategy = require('passport-oauth2-password-grant');
var util = require('util');
var Profile = require('./profile.js');
var queryString = require('querystring');


function IdmAuthStrategy(options, verify){
	
	this.idmOrigin = 'cambridge';
	this.idmProfileUrl = options.profileUrl;
	passwordGrantStrategy.call(this, options, verify);

}


util.inherits(IdmAuthStrategy, passwordGrantStrategy);

IdmAuthStrategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var self = this;
  this.idmIdentifier = options.username;
  if (!options.username) { throw new TypeError('PasswordGrantStrategy requires a username param'); }
  if (!options.password) { throw new TypeError('PasswordGrantStrategy requires a password param'); }

  var params = {};
  params.grant_type = 'aop-user';
  params.username = options.username;
  params.password = options.password;
  params.origin = this.idmOrigin;

  this._oauth2.getOAuthAccessToken(null, params,
    function(err, accessToken, refreshToken, params) {
      if (err) { return self.error(self._createOAuthError('Failed to obtain access token', err)); }

      self._loadUserProfile(accessToken, function(err, profile) {
        if (err) { return self.error(err); }

        function verified(err, user, info) {
          if (err) { return self.error(err); }
          if (!user) { return self.fail(info); }
          self.success(user, info);
        }

        try {
          var arity = self._verify.length;

          if (self._passReqToCallback) {
            if (arity == 6) {
              self._verify(req, accessToken, refreshToken, params, profile, verified);
            } else { // arity == 5
              self._verify(req, accessToken, refreshToken, profile, verified);
            }
          } else {
            if (arity == 5) {
              self._verify(accessToken, refreshToken, params, profile, verified);
            } else { // arity == 4
              self._verify(accessToken, refreshToken, profile, verified);
            }
          }
        } catch (ex) {
          return self.error(ex);
        }
      });
    });
};


IdmAuthStrategy.prototype.userProfile = function(accessToken, done){
	
	var identifier = queryString.escape(this.idmIdentifier);
	var url = this.idmProfileUrl+'/'+ identifier +'/origin/'+this.idmOrigin;
	
	this._oauth2.get(url, accessToken, function (err, body, res) {
    var json;
    console.log(json);
    if (err) {
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {}
      }
      
      if (json && json.error && typeof json.error == 'object') {
        return done(err);
      }
      return done(err);
    }
    
    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(err);
    }

    var profile = Profile.parse(json);
    profile.provider = 'IDM';
    profile._raw = body;
    profile._json = json;

    done(null, profile);
  });

}



module.exports = IdmAuthStrategy;