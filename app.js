require("dotenv").config()

require("./db")

const express = require("express")
const app = express()

require("./config")(app)

require('./config/session.config')(app)

app.locals.appTitle = `Proyecto 2`
app.use((req, res, next) => {
    if (req.session.currentUser) {
        app.locals.currentuserid = req.session.currentUser._id
        app.locals.name = req.session.currentUser.name
        if (req.session.currentUser.role === 'ADMIN') {
            app.locals.admin = req.session.currentUser.role
        }
        if (req.session.currentUser.role === 'SOCIALWORKER') {
            app.locals.socialWorker = req.session.currentUser.role
        }
        if (req.session.currentUser.role === 'USER') {
            app.locals.user = req.session.currentUser.role
        }
    } else {
        app.locals.currentuserid = null
        app.locals.admin = null
        app.locals.socialWorker = null
        app.locals.user = null
        app.locals.name = null
    }
    next()

})

require("./routes")(app)
require("./error-handling")(app)

module.exports = app