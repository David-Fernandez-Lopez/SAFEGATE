const router = require('express').Router()
const User = require('../models/User.model')
const Issues = require('../models/Issue.model')
const Foro = require('../models/Foro.model')


router.get('/eventos', (req, res) => {
    // res.send("listado eventos");
    Issues
        .find()
        .then(issues => {
            res.render('issues/list', { issues })
        })
        .catch(err => (err))
})

router.get('/eventos/crear', (req, res) => {
    // res.send("get crear eventos");
    res.render('issues/create')
})

router.post('/eventos/crear', (req, res) => {
    // res.send("post crear eventos")
    const { agression, description, location } = req.body

    Issues
        .create({ agression, description, location })
        .then(issues => {
            res.redirect('/eventos')
        })
        .catch(err => console.log(err))
})

router.post('/eventos/eliminar/:id', (req, res) => {

    const { user_id } = req.params

    Issues
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/eventos'))
        .catch(err => console.log(err))
})

router.get('/foro', (req, res) => {
    // res.send("listado eventos");
    Foro
        .find()
        .then(comments => {
            res.render('plank/list', { comments })
        })
        .catch(err => (err))
})

router.get('/foro/comentar', (req, res) => {
    // res.send("get crear eventos");
    res.render('plank/create')
})

router.post('/foro/comentar', (req, res) => {
    // res.send("post crear eventos")
    res.redirect('/foro')
})

module.exports = router