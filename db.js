const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('base de données connectée');
        
    }catch(error){
        console.error('Erreur lors de la connection à la DB',error);
        
    }
};

module.exports = connectDB;