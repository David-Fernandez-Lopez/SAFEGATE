const router = require('express').Router()
const User = require('./../models/User.model')
const Plank = require('./../models/Plank.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')

router.get('/', isLoggedIn, (req, res) => {

    Plank
        .find()
        .populate('owner', 'username')
        .then(comment => {
            res.render('plank/list', {
                comment,
                isAdmin: req.session.currentUser.role === 'ADMIN'
            })
        })
        .catch(err => console.log(err))
})

router.post('/', isLoggedIn, (req, res) => {

    const { title, description } = req.body
    const { _id: owner } = req.session.currentUser

    Plank
        .create({ title, description, owner })
        .then(() => {
            res.redirect('/foro')
        })
        .catch(err => console.log(err))
})

router.post('/eliminar/:id', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id: plank_id } = req.params

    Plank
        .findByIdAndDelete(plank_id)
        .then(() => {
            res.redirect('/foro')
        })
        .catch(err => console.log(err))
})

module.exports = router