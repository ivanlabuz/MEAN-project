let mongoose = require('mongoose')

let todoSchema = new mongoose.Schema({
  _idList: mongoose.Schema.Types.ObjectId,
  text: String,
  done: Boolean
})

module.exports = mongoose.model('Todo', todoSchema, 'todos')
