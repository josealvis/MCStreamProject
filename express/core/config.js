

let mediaObjectMapper = {
    mediaObject: null,
    getMediabyIdhash : function (hashId){
        if (this.mediaObject && this.mediaObject.length > 0 && this.mediaObject[0].media.length > 0) {
            let medialist = this.mediaObject.reduce((ac,el) => [...ac, ...el.media],[]);
            let result = medialist.filter(el => el.hashId == hashId)[0];
            return result ? result : null;
        } else return null;
    }

};

module.exports = { mediaObjectMapper }