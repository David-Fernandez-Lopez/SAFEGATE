const router = require('express').Router()
const User = require('../models/User.model')


router.get('/integradores', (req, res) => {
    // res.send("listado integradores");
    User
        .find()
        .then(usersSocialW => {
            res.render('users/socialWorkers', { usersSocialW })
        })
        .catch(err => (err))
})

module.exports = router