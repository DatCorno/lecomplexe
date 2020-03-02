const passport = require('passport'), // PassportJS authentification middleware
    LocalStrategy = require('passport-local').Strategy; // Strategy for username/password auth.

const db = require('../models');
const crypto = require('../crypto'); // TODO switch to bcrypt

auth = {}

auth.setupPassport = (server) => {
    // Setup LocalStrategy for username/password auth.
    passport.use(new LocalStrategy(
        (username, password, done) => {
            db.Author.findOne({ where: { username: username }})
            .then((author) => {
                if (!author) {
                    return done(null, false, { message: 'Incorrect username' });
                }

                hash = crypto.hash(password, author.salt)
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
            done(null, author);
        }).catch((error) => {
            done(error)
        });
    });

    server.use(passport.initialize())
    server.use(passport.session())
}

auth.passport = passport

module.exports = auth
