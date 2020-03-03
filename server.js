const express = require('express'); // Express server
const session = require('express-session'); // Express session handler
const next = require('next'); // NextJS module
const bodyParser = require('body-parser'); // Body JSON parser middleware
const dotenv = require('dotenv'); // Environment variable support

const auth = require('./middlewares/passport');
const db = require('./models');
const api = require('./api');
const util = require('./utils');

dotenv.config();

// Get constants from the environment variables
const dev = process.env.NODE_DEV !== 'production';
const connection_string = process.env.CONNECTION_STRING;

// Do Next.JS magic to setup own server
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
    // Init Express server
    const server = express()

    // TODO Change this to production
    sess = {
        secret: process.env.CONFIGURATION_SECRET,
        cookie: {},
        saveUninitialized: false,
        resave: false
    }

    server.use(session(sess))
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))

    auth.setupPassport(server)

    server.use('/api', api)

    server.post('/login', auth.passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login' 
    }))

    server.get('/admin', (req, res) => {
        if (!req.session.passport) {
            return util.send(res, 'failure', 'You need to be authenticated to do this', 401)
        }

        return app.render(req, res, '/admin', { id: req.session.passport.user })
    })

    // Forward all requests to pages to the Next.JS handler
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    db.sequelize.sync({ force: false })
    .then(() => {
            server.listen(3000, (err) => {
                if (err) throw err
                console.log("> Ready on http://localhost:3000")
            })
        });
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
});
