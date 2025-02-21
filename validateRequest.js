// importer le module express-validator

const { validationResult } = require("express-validator");

exports.validateRequest = (req,res,next) => {
    // Valider des données de la requête.

    const errors = validationResult (req);

    // i les données sont invalides, renvoyer une erreur.

    if(!errors.isEmpty()) {
        return res.status(400).json ({errors: errors.array()});
    }
    next();
};