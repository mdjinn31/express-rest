
const mongoose = require('mongoose');

const options = {
    maxPoolSize: 15, 
    serverSelectionTimeoutMS: 25000, 
    socketTimeoutMS: 95000, 
}

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_ATLAS, options );
        console.log('Data Base is online <MONGO ATLAS>', options);
    } catch (error) {
        console.log(error);
        throw new Error('Error in DB connection init in connection');
    }
}

module.exports = {
    dbConnection
}