import passport from 'passport'; // PassportJS authentification middleware
import Strategy from 'passport-local';

import db from '../models';
import crypto from '../crypto'; // TODO switch to bcrypt

const auth = {}

auth.setupPassport = (server) => {
    // Setup LocalStrategy for username/password auth.
    passport.use(new Strategy(
        (username, password, done) => {
            db.Author.findOne({ where: { username: username }})
            .then((author) => {
                if (!author) {
                    return done(null, false, { message: 'Incorrect username' });
                }

                const hash = crypto.hash(password, author.salt)
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

export default auth
