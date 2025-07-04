const mongoose = require('mongoose');
const connectToDb = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECT,{
        }).then(()=>{
            console.log('MongoDB connection established');
        });
    }catch(error){
        console.log(`MongoDB connection failed:`,error.message);
        process.exit(1);
    }
}

module.exports = connectToDb;