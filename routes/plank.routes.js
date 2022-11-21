const router = require('express').Router()
const User = require('../models/User.model')
const Plank = require('../models/Plank.model')

router.get('/foro', (req, res) => {
    // res.send("listado eventos");
    Plank
        .find()
        .then(comments => {
            res.render('plank/list', { comments })
        })
        .catch(err => (err))
})

router.get('/foro/comentar/:user_id', (req, res) => {
    const { user_id } = req.params

    User
        .find
    // res.send("get crear eventos");
    res.render('plank/create')
})

router.post('/foro/comentar/:user_id', (req, res) => {
    const { user_id } = req.params
    // res.send("post crear eventos")
    res.redirect('/foro')
})

module.exports = router