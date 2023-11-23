const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const sequelize = require("./database");
const Utilisateur = require("./models/Utilisateurs");

function initializePassport(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        // passReqToCallback: true,
      },
      async function (email, password, done) {
        const user = await Utilisateur.findOne({
          where: {
            email: email,
          },
        });
        if (!user) {
          return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
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
