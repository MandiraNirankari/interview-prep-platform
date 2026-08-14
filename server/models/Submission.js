const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: 'javascript',
    },

    status: {
      type: String,
      enum: ['submitted', 'accepted'],
      default: 'submitted',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  'Submission',
  submissionSchema
)