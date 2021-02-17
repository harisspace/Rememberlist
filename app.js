const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const { checkUser } = require('./middleware/authMiddleware')
const mylistRoutes = require('./routes/mylistRoutes')
const path = require('path')
const { checkCategory } = require('./middleware/categoryMiddleware')

// use dotenv
dotenv.config()

// initiate app
const app = express()

mongoose.connect(process.env.DB_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => {
    console.log('connect to DB')
    app.listen(3000)
  })
  .catch(err => {
    if (err.code === 'ETIMEOUT') {
      console.log('please refresh')
    }
    console.log(err)
  })

// view engine
app.set('view engine', 'ejs')

// middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// routes
app.all('*', checkCategory, checkUser)
app.use(authRoutes)
app.use('/mylist', mylistRoutes)

// handle page not found
app.use((req, res) => {
  res.status(404)
    .render('errors/404')
})
