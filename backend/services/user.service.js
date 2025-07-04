const userModel = require('../models/User.model');

module.exports.createUser = async ({
    firstName,lastName,email,password
})=>{
    if(!firstName || !email || !password){
        throw new Error('All the fields are mandatory')
    }
    const user = await userModel.create({
        fullname:{
            firstName,
            lastName
        },
        email,
        password
    })
    return user;
}
