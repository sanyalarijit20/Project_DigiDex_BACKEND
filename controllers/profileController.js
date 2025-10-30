const User = require('../models/User'); // User model

// --- 1. GET USER PROFILE ---
exports.getUserProfile = async (req, res) => {
  try {
    // req.user.id is from authMiddleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// --- 2. ADD A POKEMON TO A FOLDER ---
exports.addPokemonToFolder = async (req, res) => {
  const { folderId, pokemonName } = req.body;

  if (!folderId || !pokemonName) {
    return res.status(400).json({ message: 'Folder ID and Pokémon name are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the specific folder
    const folder = user.folders.id(folderId);
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Add the pokemon (as a string) if it's not already there
    if (!folder.pokemons.includes(pokemonName)) {
      folder.pokemons.push(pokemonName);
      await user.save();
    }
    
    // Send back the updated folder
    res.json(folder);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// --- 3. ADD A BADGE ---
exports.addBadge = async (req, res) => {
  const { name, gym } = req.body;

  if (!name || !gym) {
    return res.status(400).json({ message: 'Badge name and gym are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create the new badge
    const newBadge = {
      name,
      gym,
      collectedAt: new Date(),
    };

    // Add the new badge to the array
    user.badges.push(newBadge);
    await user.save();
    
    // Send back just the newly created badge
    res.json(user.badges[user.badges.length - 1]); // Send back the new badge

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// 1. DELETE POKEMON FROM FOLDER
exports.deletePokemonFromFolder = async (req, res) => {
  const { folderId, pokemonName } = req.params;
  try {
    const user = await User.findById(req.user.id);
    const folder = user.folders.id(folderId);
    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    // Use $pull to remove the item from the array
    folder.pokemons.pull(pokemonName);
    await user.save();
    res.json(user); // Send back the updated user
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// 2. DELETE BADGE
exports.deleteBadge = async (req, res) => {
  const { badgeId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    
    // Use $pull to remove the sub-document by its _id
    user.badges.pull(badgeId);
    await user.save();
    res.json(user); // Send back the updated user
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// 3. DELETE USER ACCOUNT
exports.deleteUser = async (req, res) => {
  try {
    // Find and delete the user document
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'User account deleted successfully.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

