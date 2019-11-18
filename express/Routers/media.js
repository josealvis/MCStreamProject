let express  = require('express');
let router = express.Router();
var path = require('path')
var rd = require('../services/mediaFile');
var fs = require ('fs');

var mediaRepo = require('../repos/mediaRepo');


router.get('/getData', function(req, res) {
    let mediaPath = mediaRepo.getMediaPaths()[0];
  
    let mediahash = req.query.mediahash;
    const path = rd.readDir(mediaPath).filter(el => el.hashId == mediahash)[0].path;//'D:/Videos/Peliculas/vid/a.mp4'
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
    let mediaPaths = mediaRepo.getMediaPaths();
    console.log(mediaPaths);
    for(let x=0; x<mediaPaths.length; x++ ){
        mediaList =  [...mediaList, ...rd.readDir(mediaPaths[x])];
    }

    res.send(mediaList.map(el =>{
      el.tumbnail = "/tumbnail/?name="+el.tumbnail;
      return el;
    }));
})

router.get('/tumbnail', function(req, res){
  let name = req.query.name;
  const  tumbnailPath= path.join(__dirname,'../tumbnails');
  console.log(tumbnailPath + '/' + name);
  res.sendFile(tumbnailPath + '/' + name)
})

module.exports = router;