var fs = require('fs');
let config = require("../core/config");
var path = require('path');
var rp = require('../repos/mediaRepo');
var { isNSFWMedia } = require('./mediaTitleProcessing');
var mediaRepo = new rp();
var { generateHash } = require('../core/helper');
var { getPoster } = require('./movieDBAPI');
const ThumbnailPath = path.join(__dirname, '../thumbnails');
var { saveImageToDisk } = require('../core/helper');


var { suportExt } = require('../core/constants');

function readDir(mediaPath) {
    let list = [];
    if (fs.existsSync(mediaPath)) {
        let collection = fs.readdirSync(mediaPath);
        for (let x = 0; x < collection.length; x++) {
            let file = mediaPath + '/' + collection[x];
            const stat = fs.statSync(file)
            if (stat.isDirectory()) {
                list = [...list, ...readDir(file)];
            } else {
                let ext = path.extname(file);
                if (suportExt.some(el => el.toUpperCase() == ext.toUpperCase())) {
                    var hashId = generateHash(file);
                    list.push({ hashId, name: collection[x], path: file, Thumbnail: getThumbnailPath(file) });
                }
            }
        };
    }
    return list;
}

function findMedibyHashID(mediaPath, _hashId) {
    let media = {};
    if (fs.existsSync(mediaPath)) {
        let collection = fs.readdirSync(mediaPath);
        for (let x = 0; x < collection.length; x++) {
            let file = mediaPath + '/' + collection[x];
            const stat = fs.statSync(file)
            if (stat.isDirectory()) {
                media = findMedibyHashID(file);
                if (media.hashId != undefined) break;
            } else {
                let ext = path.extname(file);
                if (suportExt.some(el => el.toUpperCase() == ext.toUpperCase())) {
                    var hashId = generateHash(file);
                    if (_hashId == hashId) {
                        media = { hashId, name: collection[x], path: file, Thumbnail: getThumbnailPath(file) };
                        break;
                    }
                }
            }
        };
    }
    return media;
}

function readDirOneLv(mediaPath) {
    let list = [];
    fs.readdirSync(mediaPath).forEach(function (e) {
        let file = mediaPath + '/' + e;
        const stat = fs.statSync(file)
        if (stat.isDirectory()) {
            list.push({ name: e, isFolder: true, path: file, });
        } else {
            let ext = path.extname(file);
            if (suportExt.some(el => el.toUpperCase() == ext.toUpperCase())) {
                var hashId = generateHash(file);
                list.push({ hashId, name: e, path: file, Thumbnail: getThumbnailPath(file) });
            }
        }

    });
    return list;
}

function generateMapMedia() {
    let mediaList = [];
    let mediaPaths = mediaRepo.getMediaPaths();
    for (let x = 0; x < mediaPaths.length; x++) {
        let nsfw = mediaPaths[x].nsfw == true;
        mediaList.push({
            hashId: generateHash(mediaPaths[x].path),
            repo: mediaPaths[x].displayName,
            path: mediaPaths[x].path,
            nsfw: nsfw,
            media: readDir(mediaPaths[x].path).map(el => {
                el.nsfw = nsfw ? nsfw : isNSFWMedia(el.name);
                el.Thumbnail = "/Thumbnail/?name=" + el.Thumbnail;
                return el
            })
        });
    }
    //update mediaMapper
    config.mediaObjectMapper.mediaObject = mediaList;
    return mediaList;
}

function findMediaPath(hashId, repo = null) {
    let mediaPath = '';
    if (repo === null) {
        let mediaPaths = mediaRepo.getMediaPaths();
        for (let x = 0; x < mediaPaths.length; x++) {
            mediaPath = findMedibyHashID(mediaPaths[x].path, hashId).path;
            if (mediaPath) break;
        }
    } else {
        mediaPath = findMedibyHashID(repo, hashId).path;
    }
    return mediaPath;
}

function generateThumbnail(mediaPath) {
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const ffprobePath = require('@ffprobe-installer/ffprobe').path;
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);

    let fileName = mediaPath.substr(mediaPath.lastIndexOf("/"));
    let thumnailName = fileName.substr(0, fileName.lastIndexOf(".")) + "-Thumbnail.jpg";
    let Thumbnail = ThumbnailPath + thumnailName; 

    let resolveFn = (res, rej) =>fs.access(Thumbnail, fs.F_OK, (err) => {
        // file not exist
        if (err) {
             getPoster(fileName)
                .then(function (response) {
                    // handle success
                    if (response.data.total_results > 0 && response.data.results[0].poster_path !== null) {
                        var posterUrl = "http://image.tmdb.org/t/p/w500/" + response.data.results[0].poster_path;
                        saveImageToDisk(posterUrl, ThumbnailPath + thumnailName).finally(()=>res());
                    } else {

                        var proc = new ffmpeg(mediaPath)
                            .on('error', function (err, stdout, stderr) {
                                console.log('Cannot process video: ' + err.message);
                            })
                            .screenshots({
                                count: 1,
                                filename: thumnailName,
                                folder: ThumbnailPath,
                                size: '620x480'
                            }).on('end', function() {
                                console.log('Finished processing');
                                res();
                              })
                    }
                }).catch(err => {
                    console.log('GetPoster error', err);
                })

        }else{
            console.log("Thumbnail alredy existed.")
            res();
        }
    })

    return new Promise(resolveFn)
}

function getThumbnailPath(mediaPath) {
    let fileName = mediaPath.substr(mediaPath.lastIndexOf("/"));
    let tumnailName = fileName.substr(0, fileName.lastIndexOf(".")) + "-Thumbnail.jpg";
    return tumnailName.replace('/', '');
}

module.exports = { readDir, readDirOneLv, generateThumbnail, generateMapMedia, findMediaPath };


