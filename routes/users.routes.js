const router = require('express').Router()
const User = require('../models/User.model')
const Issue = require('../models/Issue.model')
const { isLoggedIn, checkRoles } = require('./../middleware/route-guard')
const uploader = require('./../config/uploader.config')

router.get('/listado-integradores', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    User
        .find({ role: 'SOCIALWORKER' })
        .then(socialWorkers => {
            res.render('users/socialWorkers', { socialWorkers })
        })
        .catch(err => console.log(err))
})

router.post('/integradores/borrar/:id', isLoggedIn, checkRoles('ADMIN'), (req, res) => {

    const { id: socialWorker_id } = req.params

    User
        .findByIdAndDelete(socialWorker_id)
        .then(() => {
            res.redirect('/listado-integradores')
        })
        .catch(err => console.log(err))
})

router.get('/mi-perfil/:id', isLoggedIn, (req, res, next) => {

    const { id: user_id } = req.params

    User
        .findById(user_id)
        .then((user) => {
            res.render('users/profile', user)
        })

        .catch(err => console.log(err))
})

router.get('/mi-perfil/editar/:id', isLoggedIn, (req, res, next) => {
    const { id: user_id } = req.params

    User
        .findById(user_id)
        .then((user) => {
            res.render('users/edit-profile-user', user)
        })
        .catch(err => console.log(err))
})

router.post('/mi-perfil/editar/:id', isLoggedIn, uploader.single('imageField'), (req, res, next) => {

    const { name, lastname, email, idDocument, username, phoneNumber, birthDate, nationality, addresInfo, province, city, zipCode, emergencyNumber, members, childs, handicapped, divorced, custody, socialServices, tracing, police, precautionaryMeasures, employmentSituation, benefits, supportSistem, translator } = req.body

    const address = { addresInfo, province, city, zipCode }

    const familyData = { members, childs, handicapped, divorced, custody }

    const previousReport = { socialServices, tracing, police, precautionaryMeasures }

    const { id: user_id } = req.params

    let imageUrl = ''

    User
        .findByIdAndUpdate(user_id, { name, lastname, email, idDocument, username, imageUrl, phoneNumber, birthDate, nationality, address, emergencyNumber, familyData, previousReport, employmentSituation, benefits, supportSistem, translator })
        .then(() => {
            res.redirect(`/users/mi-perfil/${user_id}`)

        })
        .catch(err => console.log(err))
})

module.exports = router