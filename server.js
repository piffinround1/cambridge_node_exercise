
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
app.set('views', __dirname + '/public/view');
app.engine('html',require('ejs').renderFile);

app.use(express.static('public/view'));



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

	}),
	cookie: {secure:false}

}));

//init passport
app.use(passport.initialize());
app.use(passport.session());



app.use(flash());
/*
app config
*/


app.get('*', function(req, res,next){
	res.redirect('http://127.0.0.1:5000'+req.url);
});


app.get('/', function(req, res){
	res.render('index.html',{messages : req.flash('info')});

});


app.get('/idmauthsuccess', function(req, res){
	res.json({msg:'done with IDM auth:'+ req.user});
});


app.route('/news')
   .get(auth.checkIfLoggedIn, newsWorker.displayAllNews)
   .put(auth.checkIfLoggedIn,newsWorker.editSingleNews)
   .post(auth.checkIfLoggedIn, newsWorker.create)
   .delete(auth.checkIfLoggedIn,newsWorker.deleteSingleNews);

app.route('/news/:news_id')
	.get(auth.checkIfLoggedIn,newsWorker.displaySingleNews)
	.put(auth.checkIfLoggedIn,newsWorker.editSingleNews)
	.delete(auth.checkIfLoggedIn,newsWorker.deleteSingleNews);




app.post('/auth/idm', idmAuth());


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/'}), 
	function(req, res){
		res.render('news.html');
	});

app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/' }), 
	function(req, res){
		res.render('news.html');
	});



app.get('/signupfail', function(req, res){
	res.json(req.flash());
});


app.get('/userStats', function(req, res){
	console.log('User stats'+req.user);
	res.json(req.user);
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

app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
});



app.get('/loginFail', function(req, res){

	res.json({msg: 'Invalid username or password'});

})

app.listen(5000,function(){

	
	console.log('let the love start @ port 5000');

});