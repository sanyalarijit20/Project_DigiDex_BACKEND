const axios = require('axios');
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';


exports.getPokemonByName = async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();

  try {
    const mainResponse = await axios.get(
      `${POKEAPI_BASE_URL}/pokemon/${pokemonName}`
    );
    const mainData = mainResponse.data;

    const speciesResponse = await axios.get(mainData.species.url);
    const speciesData = speciesResponse.data;

    const typePromises = mainData.types.map((typeInfo) => {
      return axios.get(typeInfo.type.url);
    });
    const typeResponses = await Promise.all(typePromises);
    const damageRelations = typeResponses.map(
      (response) => response.data.damage_relations
    );

    const formattedData = {
      id: mainData.id,
      name: mainData.name,
      imageUrl: mainData.sprites.other.dream_world.front_default,
      info: {
        height: mainData.height,
        weight: mainData.weight,
        types: mainData.types.map((typeInfo) => typeInfo.type.name),
        description: speciesData.flavor_text_entries
          .find((entry) => entry.language.name === 'en')
          .flavor_text.replace(/(\r\n|\n|\r|\f)/gm, ' '),
      },
      stats: mainData.stats.map((statInfo) => ({
        name: statInfo.stat.name,
        value: statInfo.base_stat,
      })),
      moves: mainData.moves.slice(0, 10).map((moveInfo) => moveInfo.move.name),
      typeData: damageRelations,
    };

    res.json(formattedData);
  } catch (error) {
    console.error(`Error fetching data for ${pokemonName}:`, error.message);
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Pokémon not found' });
    } else {
      res.status(500).json({ message: 'Error fetching Pokémon data' });
    }
  }
};
