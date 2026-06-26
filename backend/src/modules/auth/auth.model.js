const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim :true,
    }, 
    password : {
        type : String,
        required : true,
    },
    bio : {
        type : String,
        default : '',
    },
    avatar : {
        type : String,
        default : '',
    }, 
    refreshToken :{
        type : String,
        default : '',
    },
},
    {
        timestamps : true,
    }
);

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;