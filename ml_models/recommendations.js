const natural = require('natural')
const Material = require('../models/Material')

async function getRecommendations(course) {
  try {
    // Tokenize the course name or description
    const tokenizer = new natural.WordTokenizer()
    const tokens = tokenizer.tokenize(course)

    // Search for materials matching these tokens
    const recommendations = await Material.find({
      $or: tokens.map((token) => ({
        title: { $regex: token, $options: 'i' }, // case-insensitive matching
      })),
    })

    return recommendations
  } catch (err) {
        return []
  }
}
