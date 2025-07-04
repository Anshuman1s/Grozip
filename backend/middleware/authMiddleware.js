const userModel = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blackListToken.model');

module.exports.authUser = async(req,res,next)=>{
    let token = req.cookies.token;
    if(!token && req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        token - req.headers.authorizartion.split(' ')[1];
    }
    if (!token) {
            return res.status(401).json({ message: "Unauthorized:" });
        }
        const isBlacklisted = await blacklistTokenModel.findOne({token:token});
    if(isBlacklisted){
        return res.status(401).json({message:'Unauthorized'})
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized"})
    }
}

