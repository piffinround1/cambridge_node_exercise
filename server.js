
/*
	node_modules incantations
*/
var express = require('express');
var app = express();

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

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



/*
	dev incantations ;)
*/
var mongocon =  require('./persistence/mongocon.js');
var auth = require('./auth/auth.js');



app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(session({
	saveUninitialized: false, 
    resave: false, 
	secret:'bequickaboutit',
	store: new mongoStore({

		url: mongocon.connection

	})

}));

//init passport
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static('public/view/'));



app.post('/login', function(req, res){
	console.log('login');
	auth.standardLoginAuth(req,res);
});

app.get('/users', function(req, res){

});


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', function(req, res){
	passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res){
		res.json({msg: 'done with fb auth'});
	}

});

app.listen(5000,function(){

	
	console.log('listening to port 5000');

});