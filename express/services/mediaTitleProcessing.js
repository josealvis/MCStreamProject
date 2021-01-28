var { nsfwWords } = require('../core/constants');


function isNSFWMedia(title) {
    let nsfw = false;
    var name = title.replace(/[^a-zA-Z\s:]/g, " ");
    var array = name.split(" ");
    
    array = array.filter(el => el.length > 1);

    nsfw = array.some(a => {
        return nsfwWords.some(el=> el.toUpperCase() ===a.toUpperCase());
     })

    return nsfw;
}

module.exports = { isNSFWMedia }; 