var fs = require('fs');
let config = require("../core/config");
var path = require('path');
var rp = require('../repos/mediaRepo');
var { isNSFWMedia } = require('./mediaTitleProcessing');
var mediaRepo = new rp();
var { generateHash } = require('../core/helper');
var { getPoster } = require('./movieDBAPI');
const tumbnailPath = path.join(__dirname, '../tumbnails');
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
                    list.push({ hashId, name: collection[x], path: file, tumbnail: getTumbnailPath(file) });
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
                        media = { hashId, name: collection[x], path: file, tumbnail: getTumbnailPath(file) };
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
                list.push({ hashId, name: e, path: file, tumbnail: getTumbnailPath(file) });
            }
        }

    });
    return list;
}

function generateMapMedia() {
    let mediaList = [];
    let mediaPaths = mediaRepo.getMediaPaths();
    for (let x = 0; x < mediaPaths.length; x++) {
        let nsfw = mediaPaths[x].NSFW === true;
        mediaList.push({
            repo: mediaPaths[x].displayName,
            path: mediaPaths[x].path,
            nsfw: mediaPaths[x].NSFW,
            media: readDir(mediaPaths[x].path).map(el => {
                el.nsfw = nsfw ? nsfw : isNSFWMedia(el.name);
                el.tumbnail = "/tumbnail/?name=" + el.tumbnail;
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

function generateTumbnail(mediaPath) {
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    const ffprobePath = require('@ffprobe-installer/ffprobe').path;
    const ffmpeg = require('fluent-ffmpeg');
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg.setFfprobePath(ffprobePath);


    //let tumbnailDir = mediaPath.substr(0, mediaPath.lastIndexOf("/"));
    let fileName = mediaPath.substr(mediaPath.lastIndexOf("/"));
    let tumnailName = fileName.substr(0, fileName.lastIndexOf(".")) + "-tumbnail.jpg";
    let tumbnail = tumbnailPath + tumnailName;


    fs.access(tumbnail, fs.F_OK, (err) => {
        // file not exist
        if (err) {

            getPoster(fileName)
                .then(function (response) {
                    // handle success
                    if (response.data.total_results > 0 && response.data.results[0].poster_path !== null) {
                        var posterUrl = "http://image.tmdb.org/t/p/w500/" + response.data.results[0].poster_path;
                        saveImageToDisk(posterUrl, tumbnailPath + tumnailName);
                    } else {

                        var proc = new ffmpeg(mediaPath)
                            .on('error', function (err, stdout, stderr) {
                                console.log('Cannot process video: ' + err.message);
                            })
                            .screenshots({
                                count: 1,
                                //timestamps: [30.5, '50%', '01:10.123'],
                                filename: tumnailName,
                                folder: tumbnailPath,
                                size: '620x480'
                            });
                    }
                }).catch(err => {
                    console.log('GetPoster error', err)
                }).finally(() => console.log("termino el callback"))

        }
    });

}

function getTumbnailPath(mediaPath) {
    let fileName = mediaPath.substr(mediaPath.lastIndexOf("/"));
    let tumnailName = fileName.substr(0, fileName.lastIndexOf(".")) + "-tumbnail.jpg";
    return tumnailName.replace('/', '');
}

module.exports = { readDir, readDirOneLv, generateTumbnail, generateMapMedia, findMediaPath };


