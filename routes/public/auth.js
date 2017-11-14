const mongoose = require('mongoose');
const express = require('express');
const config = require('../../config');

const router = express.Router();
const User = require('mongoose').model('Users');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
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

router.post('/register/google', (req, res) => {
  const googleUser = req.body.user;
  User.findOne({ googleId: googleUser.googleId }, (err, user) => {
    if (!user) {
      User.create(googleUser).then(user => {
        const payload = {id: user.id};
        var token = jwt.sign(payload, config.secretOrKey);
        res.json({user, token});
      }).catch((err) => {
        res.status(500).json({ err })
      })
    } else {
      res.status(409).json({ message: 'user already exist' })
    }
  })
});

router.post('/login/google', (req, res) => {
  const googleUser = req.body.user;
  User.findOne({ googleId: googleUser.googleId }, (err, user) => {
    if (!user) {
      res.status(401).json({ message: 'User not register'});
    } else {
      const payload = {id: user.id};
      var token = jwt.sign(payload, config.secretOrKey);
      res.json({user, token});
    }
  })
});

router.post('/register/facebook', (req, res) => {
  const facebookUser = req.body.user;
  User.findOne({ facebookId: facebookUser.facebookId }, (err, user) => {
    if (!user) {
      User.create(facebookUser).then(user => {
        const payload = {id: user.id};
        var token = jwt.sign(payload, config.secretOrKey);
        res.json({user, token});
      }).catch((err) => {
        console.log(err)
        res.status(500).json({ err })
      })
    } else {
      res.status(409).json({ message: 'user already exist' })
    }
  })
});

// res.status(500).json({ message: 'User already exist with this facebook id' })
router.post('/login/facebook', (req, res) => {
  const facebookUser = req.body.user;
  User.findOne({ facebookId: facebookUser.facebookId }, (err, user) => {
    if (!user) {
     res.status(401).json({ message: 'User not register'});
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
        const payload = {id: user.id};
        var token = jwt.sign(payload, config.secretOrKey);
        res.json({user, token});
    })
  } catch(err) {
    console.log(err)
    res.sendStatus(500)
  }
});

module.exports = router;