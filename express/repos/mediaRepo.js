var fs = require('fs');
var path = require('path');

const configPath = path.join(__dirname, '../core/config.json');

class mediaRepo {

    constructor(cfp = null) {
        this._configPath = cfp ? cfp : configPath;
    }

    getMediaPaths() {
        let rawdata = fs.readFileSync(this._configPath);
        let data = JSON.parse(rawdata);
        return data.mediaPaths;
    }

    addMediaPath(path, displayName = "", nsfw = 0) {
        let rawdata = fs.readFileSync(this._configPath);
        let data = JSON.parse(rawdata);
        data.mediaPaths.push({ path, displayName, NSFW: nsfw });
        fs.writeFileSync(this._configPath, JSON.stringify(data));
    }

    edditMediaPath(path, displayName, nsfw) {
        let pathObj = { path, displayName, nsfw };
        let rawdata = fs.readFileSync(this._configPath);
        let data = JSON.parse(rawdata);
        let index = data.mediaPaths.map(function (e) { return e.path; }).indexOf(path);
        data.mediaPaths.splice(index, 1, pathObj);
        fs.writeFileSync(this._configPath, JSON.stringify(data));
    }

    deleteMediaPath(path) {
        if (path) {
            let rawdata = fs.readFileSync(this._configPath);
            let data = JSON.parse(rawdata);
            let index = data.mediaPaths.map(function (e) { return e.path; }).indexOf(path);
            data.mediaPaths.splice(index, 1);
            fs.writeFileSync(this._configPath, JSON.stringify(data));
        } else {
            console.log("path has to be specified");
            throw "path has to be specified"
        }
    }


    saveCofig(config) {
        let rawdata = fs.readFileSync(this._configPath);
        let data = JSON.parse(rawdata);
        if (cofing.paths) {
            var newEl = [];
            data.mediaPaths = data.mediaPaths.map(el => {
                let updateEl = cofing.paths.filter(p => p.path == el.path);
                if (updateEl)  this.edditMediaPath(updateEl.path, updateEl.displayName, updateEl.nsfw)
                else return el;
            })
            newEl = cofing.paths.filter(el => !data.mediaPaths.some(p => p.path == el.path));
            newEl.map(el=>{edditMediaPath(el.path, el.displayName, el.nsfw); return el;})
        }

    }

}

module.exports = mediaRepo;