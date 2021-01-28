const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')

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
    console.log(err)
  })

// view engine
app.set('view engine', 'ejs')

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// routes
app.use(authRoutes)
