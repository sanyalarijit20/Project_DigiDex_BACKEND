const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware'); 
const {
  getUserProfile,
  addPokemonToFolder,
  addBadge,
  deletePokemonFromFolder,
  deleteBadge,
  deleteUser,
} = require('../../controllers/profileController');



router.get('/', authMiddleware, getUserProfile);
router.post('/pokemons', authMiddleware, addPokemonToFolder);
router.post('/badges', authMiddleware, addBadge);

router.delete(
  '/folders/:folderId/pokemons/:pokemonName',
  authMiddleware,
  deletePokemonFromFolder
);
router.delete('/badges/:badgeId', authMiddleware, deleteBadge);
router.delete('/', authMiddleware, deleteUser);


module.exports = router;
