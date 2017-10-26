const mongoose = require('mongoose');
const express = require('express');
const config = require('../../config');

const router = express.Router();
const User = require('mongoose').model('Users');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  console.log(config.secretOrKey);
  User.findOne({username: req.body.username}, (err, user) => {
    if(err || !user) {
      res.sendStatus(401);
    }else{
      user.verifyPassword(req.body.password, valid => {
        if(valid){
          const payload = {id: user.id};
          var token = jwt.sign(payload, config.secretOrKey);
          res.json({user, token});
        }else{
          res.sendStatus(401);
        }
      });
    }
  })
});

module.exports = router;