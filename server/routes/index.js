const express = require('express');
const router = express.Router();
const ListSchema = require('../mongoose/models/listSchema');
const TodoSchema = require('../mongoose/models/todoSchema');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    let arrayData = []
    await ListSchema.find((error, array) => arrayData.push(array))
    await TodoSchema.find((error, array) => arrayData.push(array))
    res.status(200).send(arrayData)
  } catch (error) {
    res.status(500).send(error)
  }
});

router.post('/', async function (req, res) {
  if (
    req.body._idList &&
    req.body.text &&
    req.body.done != undefined
  ) {
    const todoSchema = new TodoSchema({
      _idList: req.body._idList,
      text: req.body.text,
      done: req.body.done
    })
    try {
      const todo = await todoSchema.save()
      res.status(201).send(todo)
    } catch (error) {
      res.status(500).send(error)
    }
  } else if (
    !req.body._idList &&
    req.body.text &&
    req.body.done === undefined
  ) {
    const listSchema = new ListSchema({
      text: req.body.text
    })
    try {
      const list = await listSchema.save()
      res.status(201).send(list)
    } catch (error) {
      res.status(500).send(error)
    }
  } else {
    res.status(404).send({ "message error": "the data sent is incorrect" })
  }
}),

  router.put('/', async function (req, res) {
    if (
      req.body._id &&
      req.body._idList &&
      req.body.text &&
      req.body.done != undefined
    ) {
      const todoSchema = new TodoSchema({
        _id: req.body._id,
        _idList: req.body._idList,
        text: req.body.text,
        done: req.body.done
      })
      try {
        const todo = await TodoSchema.findByIdAndUpdate(req.body._id, todoSchema, { new: true })
        res.status(201).send(todo)
      } catch (error) {
        res.status(500).send(error)
      }
    } else {
      res.status(404).send({ "message error": "the data sent is incorrect" })
    }
  })

module.exports = router;
