let express  = require('express');
let router = express.Router();
var path = require('path')
var rd = require('../services/mediaFile');
var fs = require ('fs');

var mediaRepo = require('../repos/mediaRepo');

router.get('/getMediaPath', (req, res)=>{
    let mediaPaths = mediaRepo.getMediaPaths();
    res.send(mediaPaths);
});

router.post('/addPath', function (req, res) {
  let data = req.body
  mediaRepo.addMediaPath(data.path, data.displayName, data.nsfw);
})

module.exports = router;