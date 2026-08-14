const express = require('express')
const Question = require('../models/Question')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find()

    res.json(questions)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch questions',
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const question = await Question.create(req.body)

    res.status(201).json(question)
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create question',
      error: error.message,
    })
  }
})

module.exports = router