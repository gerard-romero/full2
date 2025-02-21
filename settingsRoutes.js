// Importation des modules

const express = require('express');
const router = express.Router();

// Importation des controllers

const {registerSettings,updateSettings,deleteSettings } = require('../controllers/settingsControllers.js');


// Création des routes

router.post('/register',registerSettings);
router.put('/:id',updateSettings);
router.delete('/:id',deleteSettings);

module.exports = router;