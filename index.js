const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./config/keys');

const app = express(); // creates the express application.

/*
  Authentication Implementation:
 */
passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    console.log(done);
  }
));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

// Used by Heroku to listen to the correct port/
const PORT = process.env.PORT || 5000;
app.listen(PORT);
