const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
schedule = require('./helpers/cron')

const ENV = require('dotenv')
ENV.config()

const port = Number(process.env.PORT) || 3000

// const dbconnect = process.env.DB_NAME
// mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

const dbconnect = process.env.DB_URL
mongoose.connect(`${dbconnect}`, { useNewUrlParser: true })

const indexRoutes = require('./routes/index')
const questionRoutes = require('./routes/questions')
const answerRoutes = require('./routes/answer')
const tagRoutes = require('./routes/tag')

schedule()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', indexRoutes)
app.use('/questions', questionRoutes)
app.use('/answers', answerRoutes)
app.use('/tags', tagRoutes)

app.get('*', (req, res) => {
  res.status(404).json({
    message: 'ERROR 404 - PAGE NOT FOUND'
  })
})

app.listen(port, () => {
  console.log('SERVER IS ON AND LISTEN TO PORT', port)
})