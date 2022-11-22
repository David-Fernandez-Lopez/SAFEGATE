const router = require('express').Router()
const User = require('../models/User.model')
const Issue = require('../models/Issue.model')


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


router.get('/mi-perfil/:id', (req, res, next) => {
    const { id: user_id } = req.params


})

module.exports = router