var { depureMediaName } = require('../core/helper');
var axios = require('axios');
const API_KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb';

//documentation https://codepen.io/pixelnik/pen/pgWQBZ
function getPoster(mediaName) {
   name = depureMediaName(mediaName, 2);
  return axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + name);
}

module.exports ={getPoster};

