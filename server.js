const express = require('express');
const session = require('express-session');
const path = require('path');
const next = require('next');
const finale = require('finale-rest');
const bodyParser = require('body-parser');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

const crypto = require('./crypto');
const db = require('./models');
const apiPosts = require('./api/post')

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

    setupPassport()

    // TODO Change this to production
    sess = {
        secret: 'allo',
        cookie: {},
        saveUninitialized: false,
        resave: false
    }

    server.use(session(sess))
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(passport.initialize())
    server.use(passport.session())

    apiPosts(server, db)

    server.post('/login', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login' 
    }))

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

setupPassport = () => {
    passport.use(new LocalStrategy(
        (username, password, done) => {
            db.Author.findOne({ where: { username: username }}).then((author) => {
                if (!author) {
                    return done(null, false, { message: 'Incorrect username' });
                }

                if (crypto.hash(password, author.salt) !== author.password) {
                    return done(null, false, { message: 'Wrong password' });

                }

                return done(null, author);
            }).catch((error) => {
                return done(error);
            })
        })
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        db.Author.findOne({ where: {id: id}}).then((author) => {
            done(null, user);
        }).catch((error) => {
            done(error)
        });
    });
}
