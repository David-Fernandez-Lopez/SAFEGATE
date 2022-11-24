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
        .then(user => {
            res.render('users/profile', {
                user,
                hasPermissions: req.session.currentUser.role !== 'USER'
            })
        })

        .catch(err => console.log(err))
})

router.get('/mi-perfil/editar/:id', isLoggedIn, (req, res, next) => {
    const { id: user_id } = req.params

    User
        .findById(user_id)
        .then(user => {
            user.whichcustody = {}
            user.whichemploymentSituation = {}
            switch (user.familyData.custody) {
                case 'Monoparental':
                    console.log('First')
                    user.whichcustody.isFirst = true
                    break
                case 'Compartida':
                    console.log('Second')
                    user.whichcustody.isSecond = true
                    break
                case 'Partida':
                    console.log('Third')
                    user.whichcustody.isThird = true
                    break
                case 'Ejercida por terceros':
                    console.log('fourth')
                    user.whichcustody.isFourth = true
                    break
                case 'No aplica':
                    console.log('fifth')
                    user.whichcustody.isFifth = true
                    break
            }

            switch (user.employmentSituation) {
                case 'Empleada': user.whichemploymentSituation.isFirst = true
                    break
                case 'Desempleada': user.whichemploymentSituation.isSecond = true
                    break
            }


            res.render('users/edit-profile-user', {
                user,
                hasPermissions: req.session.currentUser.role !== 'USER'
            })
        })
        .catch(err => console.log(err))
})

router.post('/mi-perfil/editar/:id', isLoggedIn, uploader.single('imageField'), (req, res, next) => {

    const { name, lastname, email, idDocument, username, phoneNumber, birthDate, nationality, addresInfo, province, city, zipCode, emergencyNumber, members, childs, handicapped, divorced, custody, socialServices, tracing, police, precautionaryMeasures, employmentSituation, benefits, supportSistem, translator } = req.body

    const address = { addresInfo, province, city, zipCode }

    const familyData = { members, childs, handicapped, divorced, custody }

    const previousReport = { socialServices, tracing, police, precautionaryMeasures }

    const socialHelp = { benefits, supportSistem }

    const { id: user_id } = req.params

    let imageUrl = undefined
    if (req.file && req.file.path) {
        imageUrl = req.file.path
    }

    User
        .findByIdAndUpdate(user_id, { name, lastname, email, idDocument, username, imageUrl, phoneNumber, birthDate, nationality, address, emergencyNumber, familyData, previousReport, employmentSituation, socialHelp, translator })
        .then(() => {
            res.redirect(`/users/mi-perfil/${user_id}`)

        })
        .catch(err => console.log(err))
})

module.exports = router