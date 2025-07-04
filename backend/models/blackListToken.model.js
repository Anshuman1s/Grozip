const mongoose = require('Mongoose');

constblacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Data,
        default:Date.now,
        expires:86400
    }
});

module.exports = mongoose.model('BlacklistToken',blacklisTokenSchema);
