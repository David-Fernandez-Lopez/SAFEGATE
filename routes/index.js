module.exports = app => {

    const indexRouter = require('./index.routes')
    app.use('/', indexRouter)

    const authRouter = require('./auth.routes')
    app.use('/', authRouter)

    const eventsRouter = require('./events.routes')
    app.use('/eventos', eventsRouter)

    const usersRouter = require('./users.routes')
    app.use('/users', usersRouter)

    const plankRouter = require('./plank.routes')
    app.use('/foro', plankRouter)

    const apiRouter = require('./api.routes')
    app.use('/api', apiRouter)
}