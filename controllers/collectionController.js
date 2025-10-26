const User = require('../models/User');


exports.getCollection = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ folders: user.folders, badges: user.badges });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


exports.createFolder = async (req, res) => {
  const { folderName } = req.body;

  if (!folderName) {
    return res.status(400).json({ message: 'Folder name is required' });
  }

  try {
    const user = await User.findById(req.user.id);
    
    
    if (user.folders.some(folder => folder.name === folderName)) {
      return res.status(400).json({ message: 'A folder with this name already exists' });
    }

    const newFolder = {
      name: folderName,
      pokemons: [],
    };

    user.folders.push(newFolder);
    await user.save();
    res.json(user.folders); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


exports.addPokemonToFolder = async (req, res) => {
  const { folderName, pokemonName } = req.body;

  if (!folderName || !pokemonName) {
    return res.status(400).json({ message: 'Folder name and Pokémon name are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    const folder = user.folders.find(f => f.name === folderName);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    
    if (folder.pokemons.includes(pokemonName)) {
      return res.status(400).json({ message: 'Pokémon already in this folder' });
    }

    folder.pokemons.push(pokemonName);
    await user.save();
    res.json(user.folders); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


exports.addBadge = async (req, res) => {
  const { badgeName, gymName } = req.body;

  if (!badgeName || !gymName) {
    return res.status(400).json({ message: 'Badge name and gym name are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    const newBadge = {
      name: badgeName,
      gym: gymName,
    };

    user.badges.push(newBadge);
    await user.save();
    res.json(user.badges); 
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};