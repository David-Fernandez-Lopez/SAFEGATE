const router = require('express').Router()
const User = require('../models/User.model')

const uploader = require('./../config/uploader.config')

const { isLoggedOut, isLoggedIn } = require('./../middleware/route-guard')

const bcryptjs = require('bcryptjs')
const saltRounds = 10

router.get('/inicio-sesion', isLoggedOut, (req, res) => {
  res.render('auth/login')
})

router.post('/inicio-sesion', isLoggedOut, (req, res) => {

  const { email, password } = req.body

  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email o contraseña incorrecto' })
        return
      }

      if (bcryptjs.compareSync(password, user.password) === false) {
        res.render('auth/login', { errorMessage: 'Email o contraseña incorrecto' })
        return
      }
      req.session.currentUser = user
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

router.get('/registro-usuario', isLoggedOut, (req, res) => {

  res.render('auth/signup')
})

router.post('/registro-usuario', isLoggedOut, uploader.single('imageField'), (req, res) => {

  const { name, lastname, email, password, idDocument, username, phoneNumber, birthDate, nationality, addresInfo, province, city, zipCode, emergencyNumber, members, childs, handicapped, divorced, custody, socialServices, tracing, police, precautionaryMeasures, employmentSituation, benefits, supportSistem, translator } = req.body

  const address = { addresInfo, province, city, zipCode }

  const familyData = { members: members.length ? members : undefined, childs, handicapped, divorced, custody }

  const previousReport = { socialServices, tracing, police, precautionaryMeasures }

  let imageUrl = undefined
  if (req.file && req.file.path) {
    imageUrl = req.file.path
  }

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => {
      return bcryptjs.hash(password, salt)
    })
    .then(hashedPassword => {
      return User.create({ name, lastname, email, password: hashedPassword, idDocument, username, imageUrl, phoneNumber, birthDate, nationality, address, emergencyNumber, familyData, previousReport, employmentSituation, benefits, supportSistem, translator })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/registro-integrador', isLoggedIn, (req, res) => {

  res.render('auth/socialWorker-signup')
})

router.post('/registro-integrador', isLoggedIn, uploader.single('imageField'), (req, res) => {

  const { name, lastname, email, password, idDocument, phoneNumber } = req.body

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => {
      return bcryptjs.hash(password, salt)
    })
    .then(hashedPassword => {
      return User.create({ role: 'SOCIALWORKER', name, lastname, email, password: hashedPassword, idDocument, imageUrl: req.file.path, phoneNumber })
    })
    .then(() => res.redirect('/users/listado-integradores'))
    .catch(err => console.log(err))
})

router.get('/cerrar-sesion', isLoggedIn, (req, res) => {
  req.session.destroy(() => {
    res.redirect('/inicio-sesion')
  })
})

module.exports = router