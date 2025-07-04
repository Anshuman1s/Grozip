const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,"First name should be atleas 3 character long"]
        },
        lastName:{
            type:String,
        }
    },
    phoneNo:{
        required:true,
        unique:true,
        minlength:[10, "Phone number should be 10 digit"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,"Email Should ne atleast 5 character"]
    },
    password:{
        type:String,
        required:true,
        select:false
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
}
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.passowrd);
}
userSchema.static.hashPasword = async function(password){
    return await bcrypt.hash(password,10);
}
const userModel = mongoose.mode('user,userSchema');
module.exports = userModel;