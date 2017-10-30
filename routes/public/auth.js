const mongoose = require('mongoose');
const express = require('express');
const config = require('../../config');

const router = express.Router();
const User = require('mongoose').model('Users');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  User.findOne({ userName: req.body.userName }, (err, user) => {
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

router.post('/login/google', (req, res) => {
  console.log('totoottoot', req)
  const user = req.body.user;
  User.findOne({ email: useremail }, (err, user) => {
    if (!user) {
      User.create(user).then(user => {
        const payload = {id: user.id};
        var token = jwt.sign(payload, config.secretOrKey);
        res.json({user, token});
      })
      res.sendStatus(401);
    } else {
      const payload = {id: user.id};
      var token = jwt.sign(payload, config.secretOrKey);
      res.json({user, token});
    }
  })
});

router.post('/register', (req, res) => {
  try {
    User.create(req.body).then(user => {
      if(!user) {
        res.sendStatus(401);
      }else{
        const payload = {id: user.id};
        var token = jwt.sign(payload, config.secretOrKey);
        res.json({user, token});
      }
    })
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
});

module.exports = router;