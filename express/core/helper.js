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


function getLocalIp() {

   var os = require('os');
   var ifaces = os.networkInterfaces();
   let ip = [];
   Object.keys(ifaces).forEach(function (ifname) {
      var alias = 0;
      ifaces[ifname].forEach(function (iface) {
         if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
         }

         // if (alias >= 1) {
         //    // this single interface has multiple ipv4 addresses
         //    console.log(ifname + ':' + alias, iface.address);
         // } else {
         //    // this interface has only one ipv4 adress
         //    console.log(ifname, iface.address);
         // }
         ip.push(iface.address);
         ++alias;
      });
   });

   return ip;
}





module.exports = { depureMediaName, generateHash, saveImageToDisk, getLocalIp };


