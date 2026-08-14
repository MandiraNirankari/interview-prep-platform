const express = require('express')
const Question = require('../models/Question')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/start', protect, async (req, res) => {
  try {
    const { difficulty } = req.query

    const filter = {}

    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty
    }

    const questions = await Question.aggregate([
      { $match: filter },
      { $sample: { size: 5 } },
    ])

    res.json({
      questions,
    })
  } catch (error) {
    console.error('Mock interview error:', error)

    res.status(500).json({
      message: 'Failed to start mock interview',
    })
  }
})

module.exports = router