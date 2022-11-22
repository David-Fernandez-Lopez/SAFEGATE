const router = require('express').Router()
const User = require('../models/User.model')
const Issues = require('../models/Issue.model')
const uploader = require('./../config/uploader.config')
const { isLoggedIn } = require('./../middleware/route-guard')


router.get('/eventos/crear', isLoggedIn, (req, res) => {
    // res.send("get crear eventos");
    res.render('issues/create')
})

router.post('/eventos/crear', isLoggedIn, (req, res) => {
    const { agression, description, location } = req.body
    const owner = req.session.currentUser._id

    Issues
        .create({ agression, description, location, owner })
        .then(() => {
            res.redirect('/eventos')
        })
        .catch(err => console.log(err))
})

router.get('/eventos', (req, res) => {

    Issues
        .find()
        .populate('owner')
        .then((issues) => {
            res.render('issues/list', { issues })
        })
        .catch(err => console.log(err))
})

router.post('/eventos/eliminar/:id', (req, res) => {

    const { id: issue_id } = req.params

    Issues
        .findByIdAndDelete(issue_id)
        .then(() => {
            res.redirect('/eventos')
        })
        .catch(err => console.log(err))
})

module.exports = router