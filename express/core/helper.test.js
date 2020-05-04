var { depureMediaName } = require('./helper');

describe('depureMediaName()',()=>{
    test('Should get the first 3 words from a file name', () => {
        let film ='rick.and.morty.s04e01.720p.hdtv.x264-w4f[eztv]';
        let name = depureMediaName(film);
      expect(name).toBe("rick and morty");
    });
    
    test('Should get the first 2 words from a file name', () => {
        let film ='rick.and.morty.s04e01.720p.hdtv.x264-w4f[eztv]';
        let name = depureMediaName(film,2);
      expect(name).toBe("rick and");
    });
    
    test('Should get the first word from a file name', () => {
        let film ='Spider-Man.Into.The.Spider-Verse.2018.1080p.WEBRip.x264-[YTS.AM]-Thumbnail';
        let name = depureMediaName(film,1);
      expect(name).toBe("Spider");
    });
    
    test('Should return just one word when there are just one word text', () => {
        let film ='Spider';
        let name = depureMediaName(film);
      expect(name).toBe("Spider");
    });
    
    test('Should return just two word when there are just two word text', () => {
        let film ='Spider///*//Man';
        let name = depureMediaName(film);
      expect(name).toBe("Spider Man");
    });

});
