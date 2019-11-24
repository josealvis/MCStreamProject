//console.log($.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb"));
var { depureMediaName, saveImageToDisk } = require('../core/helper');
var path = require('path');
var axios = require('axios');
const API_KEY = '15d2ea6d0dc1d476efbca3eba2b9bbfb';



//documentation https://codepen.io/pixelnik/pen/pgWQBZ
function getPoster(mediaName) {
   name = depureMediaName(mediaName, 2);
  return axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + API_KEY + "&query=" + name);
}



module.exports ={getPoster};

