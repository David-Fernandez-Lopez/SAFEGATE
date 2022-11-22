const router = require('express').Router()
const User = require('../models/User.model')
const Plank = require('../models/Plank.model')

router.get('/foro', (req, res) => {
    // res.send("listado eventos");
    Plank
        .find()
        .populate('owner')
        .then(comments => {
            res.render('plank/list', { comments })
        })
        .catch(err => console.log(err))
})

router.get('/foro/comentar', (req, res) => {
    res.render('plank/create')
})

router.post('/foro/comentar', (req, res) => {
    const { title, description } = req.body
    const owner = req.session.currentUser._id

    Plank
        .create({ title, description, owner })
        .then(() => {
            res.redirect('/foro')
        })
        .catch(err => console.log(err))
})

module.exports = router