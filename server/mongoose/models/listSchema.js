let mongoose = require('mongoose')

let listSchema = new mongoose.Schema({
  text: String
})

module.exports = mongoose.model('list', listSchema, 'lists')