const rp = require('./mediaRepo');
var fs = require('fs');
const path = require('path');

const mockConfigPath = path.join(__dirname, '../../test/express-mock/mock-config.json');
const mediaRepo = new rp(mockConfigPath);

describe('mediaRepo', function(){

    describe('getMediaPaths()', () => {
        test('should be defined', () => {
          expect(mediaRepo.getMediaPaths).toBeDefined();
        });

        test('should return data', () => {
            cleanJSON();
            var result = mediaRepo.getMediaPaths();
            expect(result.length > 0).toBe(true);
        });
      });
    
      describe('addMediaPath()', () => {
        test('should be defined', () => {
          expect(mediaRepo.addMediaPath).toBeDefined();
        });
        test('should add new path', () => {
            cleanJSON()
            var name = "newpath-1";
            mediaRepo.addMediaPath(name);
            var result = mediaRepo.getMediaPaths();
            expect(result.some(el => el.path === name)).toBe(true);
        });
      });

      describe('edditMediaPath()', () => {
        test('should be defined', () => {
          expect(mediaRepo.edditMediaPath).toBeDefined();
        });
        test('should  edit a path', () => {
            cleanJSON()
            var name = "C:/path";
            mediaRepo.edditMediaPath(name, "newDisplayName", 0);
            var result = mediaRepo.getMediaPaths();
            var edited = result.filter(el => el.path === name)[0];
            expect(edited.displayName).toBe("newDisplayName");
        });
      });

    
      describe('deleteMediaPath()', () => {
        test('should be defined', () => {
          expect(mediaRepo.deleteMediaPath).toBeDefined();
        });
        test('should  delete a path', () => {
            cleanJSON()
            var name = "C:/path";
            mediaRepo.deleteMediaPath(name);
            var result = mediaRepo.getMediaPaths();
            var edited = result.filter(el => el.path === name)[0];  
            expect(edited).toBeUndefined();
        });
      });

})

function cleanJSON() {
    let data = {
        mediaPaths: [{ path: "C:/path", displayName: "", NSFW: true }]
    }
    fs.writeFileSync(mockConfigPath, JSON.stringify(data));
}


