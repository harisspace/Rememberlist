const Mylist = require('../models/Mylist')
const User = require('../models/User')
const mongoose = require('mongoose')
const moment = require('moment')

// list_get
module.exports.mylist_get = async (req, res) => {
  const author = res.locals.user

  const dateNow = new Date()
  const zeroTime = dateNow.setHours(0,0,0,0)
  console.log(zeroTime,dateNow)
  const month = dateNow.getMonth()
  // const day = dateNow.getDay()
  const year = dateNow.getFullYear()
  const date = dateNow.getDate()
  // console.log(dateNow, month, day, year, date)

  try {
    const user = await User.findOne({ _id: author })
    const list = await Mylist.find({ author: author, isDone: false })
    let tanggalUser = ''
    let yearUser = ''
    let bulanUser = ''
    let bulanName = ''
    if (list && user) {
      res.locals.category = user.category

      // set list today
      const listNow = []
      // const listDateFuture = { }
      const arrayFuture = []
      list.forEach(data => {
        const kalender = new Date(data.date)
        const kalendarZeroTime = kalender.setHours(1,0,0,0)
        // console.log(kalendarZeroTime)
        tanggalUser = kalender.getDate()
        yearUser = kalender.getFullYear()
        bulanUser = kalender.getMonth()
        bulanName = moment().month(bulanUser).format('MMM')

        // show everything list
        if (zeroTime <= kalendarZeroTime) {
          arrayFuture.push(data)
        }

        if (year === yearUser && date === tanggalUser && bulanUser === month) {
          listNow.push(data)
        }
        // console.log(dateNow)
      })
      console.log(arrayFuture)

      res.render('mylist/index', { list: arrayFuture, listNow, listNowDate: { tanggal: tanggalUser, bulan: bulanName } })
    }
  } catch (err) {
    console.log(err)
  }
}

// list_add_post
module.exports.mylist_post = async (req, res) => {
  const { title, category, level, date } = req.body
  const calendar = date.trim().split('.')
  const fixed = []
  let kalender = calendar.map((data, index) => {
    const dataTrim = data.trim()

    if (index === 0) {
      fixed[2] = dataTrim
    } else if (index === 2) {
      fixed[0] = dataTrim
    } else {
      fixed[1] = dataTrim
    }
  })

  console.log(fixed)
  kalender = new Date(fixed)
  kalender = kalender.setHours(0,0,0,0)
  console.log(kalender)
  // const change = moment(kalender).format('LLLL')
  // console.log(change)

  const id = res.locals.user

  const authorId = mongoose.mongo.ObjectID(id)

  try {
    const myList = await Mylist.create({ title, category, level, date: kalender, author: authorId })

    if (myList) {
      res.redirect('/mylist')
    }
  } catch (err) {
    console.log(err)
  }
}

// mylist_isDone_id_post
module.exports.mylist_isDone_id_post = async (req, res) => {
  const id = req.params.id
  console.log(req.body)

  try {
    const mylist = await Mylist.findOneAndUpdate({ _id: id }, { ...req.body }, { useFindAndModify: false })

    if (mylist) {
      res.json({ redirect: '/mylist' })
    }
  } catch (err) {
    console.log(err)
  }
}

// mylist_update_id
module.exports.mylist_id_post = (req, res, next) => {
  const id = req.params.id

  if (id) {
    Mylist.findOneAndUpdate({ _id: id }, { ...req.body }, { useFindAndModify: false })
      .exec((err, data) => {
        if (data) {
          res.redirect('/mylist')
        }

        if (err) {
          console.log(err)
        }
      })
  }
}

// mylist_delete_id
module.exports.mylist_delete_id = (req, res) => {
  const id = req.params.id
  console.log(id)

  if (id) {
    Mylist.findOneAndDelete({ _id: id })
      .exec((err, data) => {
        if (err) {
          console.log(err)
          res.json({ error: err })
        }

        res.json({ redirect: '/mylist' })
      })
  }
}
