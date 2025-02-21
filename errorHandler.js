// Middleware pour traiter les erreurs
const errorHandler = (err,req,res,next) =>{
    // logger l'erreur dans la console
    console.error(`errorHandler:${err.stack}`);

    // Déterminer le code erreur,par défaut 500.

    const statusCode = err.statusCode || 500;

    // Déterminer le message d'erreur

    const message = err.message || "Erreur interne du serveur";
    
    // Déterminer le code d'erreur (utile pour les erreurs spécifiques comme mongoDB)

    const errorCode = err.code || "SERVER_ERROR";

    // Réponse JSON

    res.status(statusCode).json({
        success:false,
        message,
        code:errorCode,
        stack: err.stack,

    });   
};

module.exports = errorHandler;