const regression = require('regression')

// Dummy dataset (for example purposes)
const data = [
  // [x, y] -> x: some feature related to the material (e.g., page count), y: price
  [100, 500],
  [200, 1000],
  [150, 750],
  [300, 1500],
  [250, 1250],
]

function suggestPrice(material) {
  // Perform linear regression
  const result = regression.linear(data)
  const gradient = result.equation[0]
  const yIntercept = result.equation[1]

  // Let's assume 'material.pages' is a feature affecting the price
  const price = gradient * material.pages + yIntercept

  // Return suggested price
  return price
}

