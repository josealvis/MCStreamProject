let express  = require('express');
let router = express.Router();
var path = require('path')
var rd = require('../services/mediaFile');
var fs = require ('fs');

var rp = require('../repos/mediaRepo');
var  mediaRepo = new rp();

router.get('/getMediaPath', (req, res)=>{
    let mediaPaths = mediaRepo.getMediaPaths();
    res.send(mediaPaths);
});

router.post('/addPath', function (req, res) {
  let data = req.body
  mediaRepo.addMediaPath(data.path, data.displayName, data.nsfw);
})

router.post('/saveConfig', function (req, res) { 
  let data = req.body
  let result = mediaRepo.saveCofig(data);
  res.send(result);
})

router.post('/edidPath', function (req, res) {
    let data = req.body
    mediaRepo.edditMediaPath(data.path, data.displayName, data.nsfw);
  })

  router.post('/deletePath', function (req, res) {
    let data = req.body
    mediaRepo.deleteMediaPath(data.path);
  })

module.exports = router;