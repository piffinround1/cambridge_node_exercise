/* incantations*/
var mongocon = require('./mongocon.js');

var bcrypt = require('bcrypt-nodejs');

var mongoose = mongocon.mongoose;
/* incantations*/

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
    },
    idm : {
        id : String,
        token : String,
        username : String
    }

});


userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('user', userSchema);





