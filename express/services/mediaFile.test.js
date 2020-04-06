var mediafile = require('./mediaFile');
var fs = require('fs');
var path = require('path');
var rp = require('../repos/mediaRepo');
//var mediaRepo = new rp();

const LIST_OF_File_lv1 = ["file1.mp4", 'File2.mp4', 'file3.mkv', "LIST_OF_File_lv2"];
const LIST_OF_File_lv2 = ["file1lv2.mp4", 'file2lv2.mp4', 'file3lv2.mkv'];
const MEDIA_PATH = [
    {
        path: "LIST_OF_File_lv1",
        displayName: "Path 1",
        NSFW: "false"
    },
    {
        path: "LIST_OF_File_lv1",
        displayName: "Path 1 2",
        NSFW: "true"
    },
    {
        path: "No Existe este Dir",
        displayName: "Path 3",
        NSFW: "false"
    }
];

jest.mock('fs');
jest.mock('path');
jest.mock('../repos/mediaRepo');

fs.readdirSync.mockImplementation((file) => {
    if (file == "LIST_OF_File_lv1") return LIST_OF_File_lv1;
    else if (file == "LIST_OF_File_lv1/LIST_OF_File_lv2") return LIST_OF_File_lv2;
});

fs.statSync.mockImplementation((fileName) => {
    return {
        isDirectory: () => fileName.lastIndexOf(".") == -1
    }
});

fs.existsSync.mockImplementation((fileName) => {
    if ("LIST_OF_File_lv1" == fileName) return true;
    if ("LIST_OF_File_lv1/LIST_OF_File_lv2" == fileName) return true;

});

path.extname.mockImplementation((filename) => filename.substr(filename.lastIndexOf(".")));



describe('readDir', () => {
    var list = mediafile.readDir("LIST_OF_File_lv1");

    test('list length should be 6', () => { expect(list.length).toBe(6); });

    describe('List element has to  have all props', () => {
        list.map(el => {
            test('hashId prop has to be define', () => { expect(el.hashId != undefined).toBe(true); })
            test('name porp has to be define', () => { expect(el.name != undefined).toBe(true); })
            test('path prop has to be define', () => { expect(el.path != undefined).toBe(true); })
            test('tumbnail prop has to be define', () => { expect(el.tumbnail != undefined).toBe(true); })
        })
    });

    test('The name for the of the first element has to be  file1.mp4', () => { expect(list[0].name).toBe("file1.mp4"); });
    test('The path name  has to be  LIST_OF_File_lv1/file1.mp4', () => { expect(list[0].path).toBe("LIST_OF_File_lv1/file1.mp4");; });
});

describe('generateMapMedia', () => {

    const mockMediaRepoInstance = rp.mock.instances[0];
    mockMediaRepoInstance.getMediaPaths.mockImplementation(() => MEDIA_PATH);

    let mediaObject = mediafile.generateMapMedia();

    test('list length should be 3', () => { expect(mediaObject.length).toBe(3); });

    describe('List element has to  have all props', () => {
        mediaObject.map(el => {
            test('repo: prop has to be define', () => { expect(el.repo != undefined).toBe(true); })
            test('path porp has to be define', () => { expect(el.path != undefined).toBe(true); })
            test('nsfw: prop has to be define', () => { expect(el.nsfw != undefined).toBe(true); })
            test('media: prop has to be define', () => { expect(el.media != undefined).toBe(true); })
        })
    });
    console.log(mediaObject);
    test('media length should be 6', () => { expect(mediaObject[0].media.length).toBe(6); });

    fs.existsSync.mockImplementation(() => false);
    test('media length should be 0 when path does not exists', () => { expect(mediaObject[2].media.length).toBe(0); });

});
