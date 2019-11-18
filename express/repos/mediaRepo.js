var fs = require('fs');
var path = require('path');

const  configPath= path.join(__dirname,'../core/config.json');

class mediaRepo {

    getMediaPaths() {
        let rawdata = fs.readFileSync(configPath);
        let data = JSON.parse(rawdata);
        //console.log(data.mediaPaths);
        return data.mediaPaths;
    }
}


//var md =  new mediaRepo();
//md.getMediaPaths();

module.exports = new mediaRepo();