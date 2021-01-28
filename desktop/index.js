var {getLocalIp} = require('../express/core/helper');
const shell = require('electron').shell;

let url =getLocalIp()[0];

let img = document.getElementById('qr-code');
img.src ="http://"+url+":4000/qr"
 
let ipSpan = document.getElementById('ip-url');
ipSpan.innerHTML ="http://"+url+":4000"

function openExternal(){
    shell.openExternal("http://"+url+":4000");
}
