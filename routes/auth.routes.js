const router = require('express').Router()
const User = require('../models/User.model')

const bcryptjs = require('bcryptjs')
const saltRounds = 10

router.get('/inicio-sesion', (req, res) => {
    // res.send("get inicio sesion");
    res.render('users/login')
})

router.post('/inicio-sesion', (req, res) => {
  res.send("post inicio sesion");
})

router.get('/registro-usuario', (req, res) => {
    // res.send("get registro");
    res.render('users/signup')
})

router.post('/registro-usuario', (req, res) => {
  res.send("post registro");
})

router.get('/cerrar-sesion', (req, res) => {
  res.send("Cerrar sesión");
})

module.exports = router