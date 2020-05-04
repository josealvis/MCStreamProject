var fs = require('fs');
var https = require('http');

function depureMediaName(madiaName, numberOfWords = 3) {
   var name = madiaName.replace(/[^a-zA-Z\s:]/g, " ");
   var array = name.split(" ");
   array = array.filter(el => el.length > 1);
   numberOfWords = array.length < numberOfWords ? array.length : numberOfWords;
   var newName = "";
   for (let x = 0; x < numberOfWords; x++) {
      newName += array[x] + " ";
   }
   return newName.trim();
}

function generateHash(str) {
   return require('crypto').createHash('md5').update(str).digest("hex");
}

//Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
   var file = fs.createWriteStream(localPath);
   //console.log("posterimg: ",url)
   var request = (resolve) => https.get(url, function (response) {
      response.pipe(file);
      resolve();
   });
return new Promise(request);
}

module.exports = { depureMediaName, generateHash, saveImageToDisk }; 


