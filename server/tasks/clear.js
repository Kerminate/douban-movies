const mongoose = require('mongoose')

const clearTask = async () => {
  const Category = mongoose.model('Category')
  const Movie = mongoose.model('Movie')

  await Category.deleteMany()
  console.log('Category has been deleted')
  await Movie.deleteMany()
  console.log('Movie has been deleted')
}

module.exports = clearTask