var fs = require('fs');
var path = require('path')
var { generateHash } = require('../core/helper');
var { getPoster } = require('./movieDBAPI');
const tumbnailPath = path.join(__dirname, '../tumbnails');
var { saveImageToDisk } = require('../core/helper');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

var { suportExt } = require('../core/constants');
// create a pagination
function readDir(mediaPath) {
    let list = [];
    fs.readdirSync(mediaPath).forEach(function (e) {
        let file = mediaPath + '/' + e;
        const stat = fs.statSync(file)
        if (stat.isDirectory()) {
            list = [...list, ...readDir(file)];
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

function generateTumbnail(mediaPath) {
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
                    console.log("response total,", response.data.total_results );
                    if (response.data.total_results > 0 && response.data.results[0].poster_path !== null) {
                        var posterUrl = "https://image.tmdb.org/t/p/w500/" + response.data.results[0].poster_path;
                        console.log(posterUrl);
                        saveImageToDisk(posterUrl, tumbnailPath + tumnailName);
                    } else {
                        var proc = new ffmpeg(mediaPath)
                            .screenshots({
                                count: 1,
                                //timestamps: [30.5, '50%', '01:10.123'],
                                filename: tumnailName,
                                folder: tumbnailPath,
                                size: '620x480'
                            });
                            console.log("self generate tumbNail");

                    }
                }).catch(err => console.log('GetPoster error', err))
        }
    });

}

function getTumbnailPath(mediaPath) {
    let fileName = mediaPath.substr(mediaPath.lastIndexOf("/"));
    let tumnailName = fileName.substr(0, fileName.lastIndexOf(".")) + "-tumbnail.jpg";
    return tumnailName.replace('/', '');
}

module.exports = {readDir, generateTumbnail};