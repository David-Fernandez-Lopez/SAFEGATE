const router = require('express').Router()
const User = require('../models/User.model')

router.get('/listado-integradores', (req, res) => {
    // res.send("listado integradores");
    User
        .find({ role: 'SOCIALWORKER' })
        .then(socialWorkers => {
            res.render('users/socialWorkers', { socialWorkers })
        })
        .catch(err => console.log(err))
})

router.post('/integradores/borrar/:socialWorker_id', (req, res) => {
    const { socialWorker_id } = req.params

    User
        .findByIdAndDelete(socialWorker_id)
        .then(() => res.redirect('/listado-integradores'))
        .catch(err => console.log(err))
})

module.exports = router