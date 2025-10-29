const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware'); //existing middleware
const {
  getUserProfile,
  addPokemonToFolder,
  addBadge,
} = require('../../controllers/profileController');


router.get('/', authMiddleware, getUserProfile);
router.post('/pokemons', authMiddleware, addPokemonToFolder);
router.post('/badges', authMiddleware, addBadge);

module.exports = router;
