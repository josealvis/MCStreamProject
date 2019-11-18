var { depureMediaName } = require('../express/core/helper');

test('depureMediaName() should get the first 3 words from a file name', () => {
    let film ='rick.and.morty.s04e01.720p.hdtv.x264-w4f[eztv]';
    let name = depureMediaName(film);
  expect(name).toBe("rick and morty");
});

test('depureMediaName() should get the first 2 words from a file name', () => {
    let film ='rick.and.morty.s04e01.720p.hdtv.x264-w4f[eztv]';
    let name = depureMediaName(film,2);
  expect(name).toBe("rick and");
});

test('depureMediaName() should get the first word from a file name', () => {
    let film ='Spider-Man.Into.The.Spider-Verse.2018.1080p.WEBRip.x264-[YTS.AM]-tumbnail';
    let name = depureMediaName(film,1);
  expect(name).toBe("Spider");
});

test('depureMediaName() should return just one word when there are just one word text', () => {
    let film ='Spider';
    let name = depureMediaName(film);
  expect(name).toBe("Spider");
});

test('depureMediaName() should return just two word when there are just two word text', () => {
    let film ='Spider///*//Man';
    let name = depureMediaName(film);
  expect(name).toBe("Spider Man");
});