// Importer express-validator

const { body,param } = require ("express-validator");

// Validation pour l'endpoint POST/register.
// Validation pour la création d'un utilisateur.

exports.validateRegisterUser = [
    body ("name").trim().notEmpty().isLength({min:3}).withMessage("Le nom doit avoir au minimum trois caractères.").isLength({max: 15}).withMessage("Le nom doit avoir 15 caractères maximum.").withMessage("Le nom est obligatoire."),

    body("email").trim().notEmpty().withMessage("Le email est obligatoire.").isEmail().withMessage("Veuillez entrer une adresse email valide."),

    body("password").trim().notEmpty().withMessage("Le mot de passe est obligatoire.").isLength({min:6,max :200}).withMessage("Le mot de passe doit contenir entre 6 et 200 caractères.")
];

exports.validateDeleteUser = [
    param("id").isMongoId().withMessage("ID utilisateur manquant ou invalide."),
];

exports.validateUpdateUser = [
    body ("name").trim().notEmpty().isLength({min:3}).withMessage("Le nom doit avoir au minimum trois caractères.").isLength({max: 15}).withMessage("Le nom doit avoir 15 caractères maximum.").withMessage("Le nom est obligatoire."),

    body("email").trim().notEmpty().withMessage("Le email est obligatoire.").isEmail().withMessage("Veuillez entrer une adresse email valide."),

    body("password").trim().notEmpty().withMessage("Le mot de passe est obligatoire.").isLength({min:6,max :200}).withMessage("Le mot de passe doit contenir entre 6 et 200 caractères.")
];