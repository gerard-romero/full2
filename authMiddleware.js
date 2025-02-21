const User = require('../models/User');
const JWT = require ('jsonwebtoken');// On importe la bibliothèque `jsonwebtoken` pour travailler avec les JWT.
const JWT_SECRET = process.env.JWT_SECRET;

const protect = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json ({message:'Token manquant'});
        }
        const decoded = JWT.verify(token,JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    }catch(error){
        res.status (500).json({message:'Erreur lors de la verif du token',error});

    }
};

const adminCheck = async(req,res, next) => {
    try{
        if(req.user.role === "admin"){
            next();

        }else{
            return res.status(401).json ({message:'Unauthorized not admin'});
        }

    }catch(error){
        res.status(500).json({message:`Erreur d'authentification admin`});
    }
}

module.exports = {protect, adminCheck};
