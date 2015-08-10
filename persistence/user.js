var mongocon = require('./mongocon.js');

var mongoose = mongocon.mongoose;


var userSchema = new mongoose.Schema({

	 local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    }

});




module.exports = mongoose.model('user', userSchema);





