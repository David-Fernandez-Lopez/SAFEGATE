const router = require('express').Router()
const User = require('../models/User.model')

const uploader = require('./../config/uploader.config')

const bcryptjs = require('bcryptjs')
const saltRounds = 10

router.get('/inicio-sesion', (req, res) => {
    // res.send("get inicio sesion");
    res.render('auth/login')
})

router.post('/inicio-sesion', (req, res) => {
  // res.send("post inicio sesion");
  const {email, password} = req.body
  // console.log(email)
  User
    .findOne({ email })
    .then(user => {
      // console.log(user)
      if(!user) {
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

router.get('/registro-usuario', (req, res) => {
    // res.send("get registro");
    res.render('auth/signup')
})

router.post('/registro-usuario', uploader.single('imageField'), (req, res) => {
  // res.send("post registro");

  const {name, lastname, email, password, idDocument, username, imageField, phoneNumber, birthDate, nationality, addresInfo, province, city, zipCode, emergencyNumber, members, childs, handicapped, divorced, custody, socialServices, tracing, police, precautionaryMeasures, employmentSituation, benefits, supportSistem, translator} = req.body
  
  const address = { addresInfo, province, city, zipCode }
  
  const familyData = { members, childs, handicapped, divorced, custody }
  
  const previousReport = {socialServices, tracing, police, precautionaryMeasures}
  
  // res.send({ name, lastname, email, password, idDocument, username, imageUrl, phoneNumber, birthDate, nationality, address, emergencyNumber, familyData, previousReport, employmentSituation, benefits, supportSistem, translator })
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => {
      return bcryptjs.hash(password, salt)
    })
    .then(hashedPassword => {
      return User.create({ name, lastname, email, password:hashedPassword, idDocument, username, imageUrl: imageField, phoneNumber, birthDate, nationality, address, emergencyNumber, familyData, previousReport, employmentSituation, benefits, supportSistem, translator })
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/cerrar-sesion', (req, res) => {
  // res.send("Cerrar sesión");
  
  req.session.destroy(() => res.redirect('/inicio-sesion'))
})

module.exports = router