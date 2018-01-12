const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id); // Actual user id, not google id
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user); // Actual user id, not google id
  });
});

//Google Authentication Implementation:
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },

  /*
    The below are the variables that Google returns to you from
    the user - containing their information:
   */
  (accessToken, refreshToken, profile, done) => {
    /*
      Here is where we could set details on
      the user, like admin etc.
     */
     User.findOne({ googleId: profile.id }).then((existingUser) => {
       if (existingUser) {
         // We already have a record for this user.
         done(null, existingUser);
       } else {
         // Users are differentiated via google profile id:
         new User({ googleId: profile.id }).save().then((user) => {
           done(null, user);
         });
       }
     });
  }
));
