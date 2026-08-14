const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const questionRoutes = require('./routes/questionRoutes')
const authRoutes = require('./routes/authRoutes')
const progressRoutes = require('./routes/progressRoutes')
const mockRoutes = require('./routes/mockRoutes')
const submissionRoutes = require('./routes/submissionRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/mock', mockRoutes)
app.use('/api/submissions', submissionRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'Interview Prep API is running',
  })
})

app.get('/api/test', (req, res) => {
  res.json({
    message: 'React successfully connected to Express!',
  })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      )
    })
  })
  .catch((error) => {
    console.error(
      'MongoDB connection failed:',
      error.message
    )
  })