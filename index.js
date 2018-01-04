const express = require('express');
const app = express(); // creates the express application.

// The first express route handler
app.get('/', (req, res) => {
  res.send({hi: 'there'});
});


// Used by Heroku to listen to the correct port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
