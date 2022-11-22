const router = require('express').Router()
const User = require('../models/User.model')
const Issue = require('../models/Issue.model')
const uploader = require('./../config/uploader.config')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get('/crear', isLoggedIn, (req, res) => {
    // res.send("get crear eventos");
    res.render('issues/create')
})

router.post('/crear', isLoggedIn, (req, res) => {
    const { agression, description, location } = req.body
    const owner = req.session.currentUser._id

    Issue
        .create({ agression, description, location, owner })
        .then(() => {
            res.redirect('/eventos')
        })
        .catch(err => console.log(err))
})

router.get('/', isLoggedIn, checkRoles('SOCIALWORKER', 'ADMIN'), (req, res) => {

    Issue
        .find()
        .select({ owner: 1, _id: 0 })
        .then((owners) => {
            const stringIds = owners.map(elm => elm.owner.toString())
            const uniqueOwners = [...new Set(stringIds)]

            const ownerPromises = uniqueOwners.map(elm => Issue.find({ owner: elm }).populate('owner'))

            return Promise.all(ownerPromises)
        })
        .then(eventsByOwner => {
            // console.log(eventsByOwner)
            res.render('issues/list', { eventsByOwner })
        })
        .catch(err => console.log(err))
})

router.post('/eliminar/:id', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id: issue_id } = req.params

    Issue
        .findByIdAndDelete(issue_id)
        .then(() => {
            res.redirect('/eventos')
        })
        .catch(err => console.log(err))
})

module.exports = router