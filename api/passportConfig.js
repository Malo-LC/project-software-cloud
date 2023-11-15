const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializePassport(passport, connection) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        // passReqToCallback: true,
      },
      function (email, password, done) {
        connection.query(
          "SELECT * FROM `utilisateurs` WHERE `email` = '" + email + "'",
          function (err, rows) {
            if (err) return done(err);
            if (!rows.length) {
              return done(null, false);
            }
            if (!bcrypt.compareSync(password, rows[0].password)) {
              return done(null, false);
            }
            return done(null, rows[0]);
          }
        );
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}

module.exports = initializePassport;
