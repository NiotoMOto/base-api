
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const config = require('./config')
const apiRoutes = require('./routes/api');
const publicRoutes = require('./routes/public');
const passport = require('./services/passport');

const User = require('mongoose').model('Users');

const populateDatabase = require('./mongo/populate.js');


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

populateDatabase();
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(passport.initialize());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors(corsOptions));

app.use(apiRoutes);
app.use(publicRoutes);

app.listen(config.port, function () {
  console.log(`Serveur mise en route sur le port ${config.port}`);
});
