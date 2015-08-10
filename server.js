
/*
	node_modules incantations
*/
var express = require('express');
var app = express();

var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('./auth/auth.js');
var morgan = require('morgan');


var passport = require('passport');


/*
	dev incantations ;)
*/
var mongocon =  require('./persistence/mongocon.js');


/*
app config
*/

app.use(morgan('dev'));

app.use(cookieParser());

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



/*
app config
*/




app.use(express.static('public/view/'));


app.get('/', function(req, res){
	res.render('index.html');

});


app.post('/login', function(req, res){
	auth.standardLoginAuth(req,res);
});

app.get('/users',auth.checkIfLoggedIn, function(req, res){
	
});


app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/' }), 
	function(req, res){
		res.json({msg: 'done with fb auth' + req.user});
	});

app.listen(5000,function(){

	
	console.log('listening to port 5000');

});