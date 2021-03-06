
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
var flash = require('connect-flash');

var passport = require('passport');


/*
	dev incantations ;)
*/
var mongocon =  require('./persistence/mongocon.js');
var newsWorker = require('./util/newsWorker.js');

var idmAuth = require('./auth/idmAuth.js');
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


app.use(express.static('public/view/'));
app.use(flash());
/*
app config
*/


app.get('/', function(req, res){
	res.render('index.html',{messages : req.flash('info')});

});


app.get('/idmauthsuccess', function(req, res){
	res.json({msg:'done with IDM auth:'+ req.user});
});


app.route('/news')
   .get(auth.checkIfLoggedIn, newsWorker.displayAllNews)
   .post(auth.checkIfLoggedIn, newsWorker.create);

app.route('/news/:news_id')
	.get(auth.checkIfLoggedIn,newsWorker.displaySingleNews)
	.put(auth.checkIfLoggedIn,newsWorker.editSingleNews);




app.post('/auth/idm', idmAuth());


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/'}), 
	function(req, res){
		res.json({msg: 'done with twitter auth' + req.user});
	});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/' }), 
	function(req, res){
		res.json({msg: 'done with fb auth' + req.user});
	});



app.get('/signupfail', function(req, res){
	res.json(req.flash());
});

app.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/signupfail'}),
	function(req, res){

		res.json({msg: 'done with signup auth' + req.user});

	}

);


app.post('/login', passport.authenticate('local-auth',{failureRedirect: '/loginFail'}),
	function(req, res){


		res.json({msg: 'done with login auth' + req.user});

	}

);


app.get('/loginFail', function(req, res){

	res.json({msg: 'Invalid username or password'});

})

app.listen(5000,function(){

	
	console.log('let the love start @ port 5000');

});