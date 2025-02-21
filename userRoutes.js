// Importer les modules nécessaires

const express = require ('express');

const router = express.Router();

const {protect,adminCheck}  = require('../middleware/authMiddleware.js');

// Importer les controllers

const {registerUser, getAllUser, updateUser, deleteUser, login } = require ( '../controllers/userControllers.js');

const {validateRequest} = require ("../middleware/validateRequest.js");

const {validateRegisterUser,validateUpdateUser,validateDeleteUser} = require('../validations/authValidation.js');

// Créer des routes

router.post('/register',validateRegisterUser,validateRequest,registerUser);
router.get('/',protect,adminCheck,getAllUser);
router.put('/:id',protect,validateUpdateUser,validateRequest,updateUser);
router.delete('/:id',protect,validateDeleteUser,validateRequest,deleteUser);
router.post('/login',login);

module.exports = router;
