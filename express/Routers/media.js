let express  = require('express');
let router = express.Router();
var path = require('path')
var rd = require('../services/mediaFile');
var fs = require ('fs');

var {isNSFWMedia} = require('../services/mediaTitleProcessing');

var rp = require('../repos/mediaRepo');
var  mediaRepo = new rp();

router.get('/getData', function(req, res) {
    let mediaList = [];
    let mediaPaths = mediaRepo.getMediaPaths();
    for(let x=0; x<mediaPaths.length; x++ ){
        mediaList =  [...mediaList, ...rd.readDir(mediaPaths[x].path)];
    }

    let mediahash = req.query.mediahash;
    const path = mediaList.filter(el => el.hashId == mediahash)[0].path;//'D:/Videos/Peliculas/vid/a.mp4'
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/webm', 
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/webm',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });

router.get('/getMediaList', function(req, res){
    let mediaList = [];
    let range = 150;
    let nsfw = false;
    let rowNum = req.query.rowNum != undefined?req.query.rowNum:0;
    let mediaPaths = mediaRepo.getMediaPaths();
    nsfw = mediaPaths[0].nsfw;
    for(let x=0; x<mediaPaths.length; x++ ){
        mediaList =  [...mediaList, ...rd.readDir(mediaPaths[x].path)];
    }
    var end =  range*(rowNum+1);
    var start =  rowNum*range
    mediaList =  mediaList.slice(0, end);

    res.send(mediaList.map(el =>{
      rd.generateTumbnail(el.path);
      el.tumbnail = "/tumbnail/?name="+el.tumbnail;
      el.nsfw =nsfw?nsfw:isNSFWMedia(el.name);
      return el;
    }));
})

router.get('/getDataObject', function(req, res){
  let mediaList = rd.generateMapMedia();
  res.send(mediaList);
})

router.get('/tumbnail', function(req, res){
  let name = req.query.name;
  const  tumbnailPath= path.join(__dirname,'../tumbnails');
  res.sendFile(tumbnailPath + '/' + name)
})

module.exports = router;