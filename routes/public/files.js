const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose');
const fs = require ('fs');
const path = require('path');

const fileHelper = require('../../services/filesHelpers');
const shemaNames = require('../../mongo/shemaNames');
const Photos = mongoose.model(shemaNames.PHOTOS);
const config = require('../../config');
const auth = require('./auth');

const router = express.Router();
const imageFilter = fileHelper.imageFilter;
const upload = multer({ dest: `${config.uploadPath}/`, fileFilter: imageFilter });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
      const file = req.file;
      
      const photo = await Photos.create({
        path: file.filename,
        name: req.body.name,
        mimetype: file.mimetype
      });
      res.send(photo);
  } catch (err) {
      res.sendStatus(400);
  }
})

router.get('/image/:id', upload.single('file'), async (req, res) => {
  try {
      const photo = await Photos.findById(req.params.id)
      if(!photo) {
        res.status(404);
      }
      res.setHeader('Content-Type', photo.mimetype);
      fs.createReadStream(path.join(config.uploadPath, photo.path)).pipe(res);
  } catch (err) {
      res.sendStatus(400);
  }
})


module.exports = router;