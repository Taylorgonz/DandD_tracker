require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt-nodejs')
const User = require('../models').User


passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

// Oauth2.0 Google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, cb) {
  return cb(null, profile)
}
))

// Local signup
passport.use('local-signup', new LocalStrategy(
  {
    usernameField: 'user_name',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, user_name, password, done) => {
    const generateHash = (password) => {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null)
    }
    User.findOne({
      where: {
        user_name: user_name
      }
    }).then((user) => {
      if (user) {
        return done(null, false, {
          message: 'That user name is already taken'
        })
      } else {
        const userPassword = generateHash(password)
        const data = 
          {
            user_name: user_name,
            password: userPassword
          }
        User.create(data).then((newUser, created) => {
          if (!newUser) {
            return done(null, false)
          }
          if (newUser) {
            return done(null, newUser)
          }
        })
      }
    })
  }
))

