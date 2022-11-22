module.exports = app => {

    const indexRouter = require('./index.routes')
    app.use('/', indexRouter)

    const authRouter = require('./auth.routes')
    app.use('/', authRouter)

    const eventsRouter = require('./events.routes')
    app.use('/', eventsRouter)

    const usersRouter = require('./users.routes')
    app.use('/', usersRouter)

    const plankRouter = require('./plank.routes')
    app.use('/', plankRouter)

    // const apiRouter = require('./api.routes')
    // app.use('/api', apiRouter)
}