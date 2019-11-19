//console.log($.getJSON("https://api.themoviedb.org/3/discover/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb"));
var {depureMediaName} = require('../core/helper');
var axios  = require('axios');
const API_KEY =  '15d2ea6d0dc1d476efbca3eba2b9bbfb';

var film ='hustlers';
var name = depureMediaName(film,2);
getPoster(name);


//var n = depureMediaName(film);
//console.log(n);

//documentation https://codepen.io/pixelnik/pen/pgWQBZ
function getPoster(mediaName){
   axios.get("https://api.themoviedb.org/3/search/movie?api_key="+API_KEY+"&query=" + mediaName)
            .then(function (response) {
                // handle success
                if (response != "Nothing found."){    
                   var r = response.data.results[0].poster_path ;  
                   poster_path:"http://image.tmdb.org/t/p/w500//zBhv8rsLOfpFW2M5b6wW78Uoojs.jpg"
        
                  console.log(JSON.parse(response.data));
                       //$('#poster').html('<p>Your search found: <strong>' + json.results[0].title + '</strong></p><img src=\"http://image.tmdb.org/t/p/w500/' + json.results[0].poster_path + '\" class=\"img-responsive\" >');
                    } 
            })

      return false;
 }

