const router = require('express').Router()
const User = require('../models/User.model')
const Plank = require('../models/Plank.model')

router.get('/', (req, res) => {
    // res.send("listado eventos");
    Plank
        .find()
        .populate('owner', 'username')
        .then(comment => {
            res.render('plank/list', { comment })
        })
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    // res.send("post listado eventos");

    const { title, description } = req.body

    const owner = req.session.currentUser._id

    Plank
        .create({ title, description, owner })
        .then(() => {
            // res.send({ title, description, owner })
            res.redirect('/foro')
        })
        .catch(err => console.log(err))
})

router.post('/eliminar/:id', (req, res) => { 

    const { id: plank_id } = req.params
    // res.send(plank_id);
    Plank
        .findByIdAndDelete(plank_id)
        .then(() => {
            res.redirect('/foro')
        })
        .catch(err => console.log(err))
})

module.exports = router