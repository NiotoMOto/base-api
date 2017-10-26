const mongoose = require('mongoose');
const express = require('express');
const restify = require('express-restify-mongoose');
const _ = require('lodash');

const router = express.Router();
const passport = require("passport");

const models = require('../../mongo/')

_.forEach(models, model => {
  if( model.private) {
    restify.serve(router, model.model, {preMiddleware: passport.authenticate('jwt', { session: false })});
  } else {
    restify.serve(router, model.model);
  }
});

module.exports = router;
