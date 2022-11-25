const router = require("express").Router()

const Issue = require('../models/Issue.model')

router.get("/json", (req, res, next) => {

    Issue
        .find()
        .then(issues => res.json(issues))
        .catch(err => {
            console.log(err)
            next()
        })
})

module.exports = router