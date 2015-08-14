var User = require('../persistence/user.js');







userUtil = {


	getSingleUser : function(req,res,next){

		User.findOne({user})

	}


};



module.exports = userUtil;
