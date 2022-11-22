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

router.get('/foro/comentar', (req, res) => {
    // res.send("get crear eventos");

    User
        .find()
        .select({username:1})
        .then(users => {
            const user = {users}
            res.render('plank/create', {users})
        })
        .catch(err => console.log(err))
})

router.post('/foro/comentar', (req, res) => {

    // res.send("post crear eventos")
    res.redirect('/foro')
})

module.exports = router