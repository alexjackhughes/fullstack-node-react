const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('./models/User');

// Using mLab
mongoose.connect(keys.mongoURI);

const passportConfig = require('./services/passport');

const app = express(); // creates the express application.

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);

// Used by Heroku to listen to the correct port.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
