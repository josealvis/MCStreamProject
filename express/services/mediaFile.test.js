var  mediafile  = require('./mediaFile');
var fs = require('fs');
var path = require('path');
// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffprobePath = require('@ffprobe-installer/ffprobe').path;
// const ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath(ffmpegPath);
// ffmpeg.setFfprobePath(ffprobePath);


jest.mock('fs');
jest.mock('path');



test('should fetch users', () => {

fs.readdirSync.mockImplementation(()=>{ return ["file1.mp4","file2.mp4","file3.mp4","file4.mp4"]});
fs.statSync.mockImplementation(()=>{ return {isDirectory: ()=>false}});
path.extname.mockImplementation(()=>".mp4");

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  var list = mediafile.readDir("mediafile");
  
  expect(list.length).toBe(4);
  expect(list[0].name).toBe("file1.mp4");
  expect(list[0].path).toBe("mediafile/file1.mp4");
  expect(list[0].hashId != undefined).toBe(true);
  expect(list[0].tumbnail != undefined).toBe(true);
});


