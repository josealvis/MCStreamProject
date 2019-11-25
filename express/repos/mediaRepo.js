var fs = require('fs');
var path = require('path');

const  configPath= path.join(__dirname,'../core/config.json');

class mediaRepo {

    getMediaPaths() {
        let rawdata = fs.readFileSync(configPath);
        let data = JSON.parse(rawdata);
        return data.mediaPaths;
    }
}

module.exports = new mediaRepo();