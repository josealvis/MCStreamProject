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

    edditMediaPath(){

    }

}

module.exports = new mediaRepo();