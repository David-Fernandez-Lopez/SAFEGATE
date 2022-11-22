const router = require('express').Router()
const User = require('../models/User.model')
const Issue = require('../models/Issue.model')
const { isLoggedIn } = require('./../middleware/route-guard')

router.get('/listado-integradores', (req, res) => {
    // res.send("listado integradores");
    User
        .find({ role: 'SOCIALWORKER' })
        .then(socialWorkers => {
            res.render('users/socialWorkers', { socialWorkers })
        })
        .catch(err => console.log(err))
})

router.post('/integradores/borrar/:id', (req, res) => {
    const { id: socialWorker_id } = req.params

    User
        .findByIdAndDelete(socialWorker_id)
        .then(() => res.redirect('/listado-integradores'))
        .catch(err => console.log(err))
})

router.get('/mi-perfil/:id', isLoggedIn, (req, res, next) => {
    const { id: user_id } = req.params

    User
        .findById(user_id)
        .then(() => {
            res.send('prueba')
        })
        // .then(users => {
        //     res.render('users/profile', users)
        // })
        .catch(err => (err))
})

module.exports = router