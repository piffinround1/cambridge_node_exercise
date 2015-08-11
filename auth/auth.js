

var userDao = require('../persistence/user.js');
var serverMsg = require('../util/serverMessage.js'); 
var fbAuth = require('./fbAuth.js');
var localSignUp = require('./localSignUp.js');
var localAuth = require('./localAuth.js');


/*var _auth = {

	checkUser : function(usernameAndPassword,callback){
		console.log('passing thru checkuser');
		 userDao.checkLogin(usernameAndPassword,callback);
	}

}*/


var auth = {


	/*standardSessionAuth : function(req, res){

		if(!req.session)
			return false;
	}

	,

	standardLoginAuth : function(req, res){
		
	
		console.log('standardLoginAuth '+JSON.stringify({username:req.body.username,password:req.body.password}));
		_auth.checkUser({username:req.body.username,password:req.body.password}, function(err, data){
			var authCode;
			if(err)
				//handle error
				authCode = 'Server Down or error'
			
				if(!data || data.length === 0){
					authCode = 'Incorrect username/password'
				
				}else{
					authCode = 'Auth Success';
				
				}
				
			
				res.json(serverMsg.serverMsg({code: authCode},'code'));
			
		});
	},

	fbAuth : fbAuth.authenticate,*/

	checkIfLoggedIn : function(req, res, next){

		if(req.isAuthenticated())
			return next();

		res.redirect("/");

	}
	


};


module.exports = auth;
