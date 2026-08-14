const express = require('express')
const Submission = require('../models/Submission')
const Progress = require('../models/progress')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try {
    const {
      questionId,
      code,
      language,
    } = req.body

    if (!questionId || !code) {
      return res.status(400).json({
        message: 'Question ID and code are required',
      })
    }

    const submission = await Submission.create({
      user: req.userId,
      question: questionId,
      code,
      language: language || 'javascript',
      status: 'accepted',
    })

    await Progress.findOneAndUpdate(
      {
        user: req.userId,
        question: questionId,
      },
      {
        solved: true,
      },
      {
        upsert: true,
        new: true,
      }
    )

    res.status(201).json({
      message: 'Solution submitted successfully',
      submission,
    })
  } catch (error) {
    console.error(
      'Submission error:',
      error
    )

    res.status(500).json({
      message: 'Failed to submit solution',
    })
  }
})

router.get('/', protect, async (req, res) => {
  try {
    const submissions = await Submission.find({
      user: req.userId,
    })
      .populate('question')
      .sort({ createdAt: -1 })

    res.json(submissions)
  } catch (error) {
    console.error(
      'Submission history error:',
      error
    )

    res.status(500).json({
      message: 'Failed to get submissions',
    })
  }
})

module.exports = router