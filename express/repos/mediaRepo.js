var fs = require('fs');
var path = require('path');

const  configPath= path.join(__dirname,'../core/config.json');

class mediaRepo {

    getMediaPaths() {
        let rawdata = fs.readFileSync(configPath);
        let data = JSON.parse(rawdata);
        return data.mediaPaths;
    }

    addMediaPath(path,displayName ="", nsfw =0){
        let rawdata = fs.readFileSync(configPath);
        let data = JSON.parse(rawdata);
        data.mediaPaths.push({path, displayName, NSFW:nsfw});
        fs.writeFileSync(configPath, JSON.stringify(data));
    }

    edditMediaPath(path,displayName ="", nsfw =0){
        let pathObj = {path,displayName,nsfw};
        let rawdata = fs.readFileSync(configPath);
        let data = JSON.parse(rawdata);
        let index = data.mediaPaths.indexOf(data.mediaPaths.filter(el=> el.path === pathObj.path)[0]);
        data = data.splice(index, 1, pathObj);
        fs.writeFileSync(configPath, JSON.stringify(data));
    }

}

module.exports = new mediaRepo();