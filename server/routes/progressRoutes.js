const express = require('express')
const Progress = require('../models/progress')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

// Get logged-in user's progress
router.get('/', protect, async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.userId,
    }).populate('question')

    res.json(progress)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get progress',
    })
  }
})

// Mark a question as solved
router.post('/:questionId', protect, async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      {
        user: req.userId,
        question: req.params.questionId,
      },
      {
        solved: true,
      },
      {
        new: true,
        upsert: true,
      }
    )

    res.json({
      message: 'Question marked as solved',
      progress,
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update progress',
    })
  }
})

module.exports = router