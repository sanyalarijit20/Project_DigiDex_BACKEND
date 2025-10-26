const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const {
  getCollection,
  createFolder,
  addPokemonToFolder,
  addBadge,
} = require('../../controllers/collectionController');


router.get('/', authMiddleware, getCollection);
router.post('/folder', authMiddleware, createFolder);
router.put('/folder/add', authMiddleware, addPokemonToFolder);
router.post('/badge', authMiddleware, addBadge);
module.exports = router;
