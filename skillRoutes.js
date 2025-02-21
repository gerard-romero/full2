// Importation des modules

const express = require('express');
const router = express.Router();

// Importation des controllers

const {registerSkill,updateSkill,deleteSkill } = require('../controllers/skillControllers.js');


// Création des routes

router.post('/register',registerSkill);
router.put('/:id',updateSkill);
router.delete('/:id',deleteSkill);

module.exports = router;