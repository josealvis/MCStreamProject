var { isNSFWMedia } = require('./mediaTitleProcessing');


test('isNSFWMedia() should return true for "rick.and.morty-w4f[nsfw].mp4"', () => {
    let title ="rick.and.morty-w4f[nsfw].mp4";
    let nsfw = isNSFWMedia(title);
  expect(nsfw).toBe(true);
});

test('isNSFWMedia() should return true for "rick.[nsfw]and.morty-w4f.mp4"', () => {
    let title ="rick.[nsfw]and.morty-w4f.mp4";
    let nsfw = isNSFWMedia(title);
  expect(nsfw).toBe(true);
});

test('isNSFWMedia() should return true for "rick.[nsfw]and.morty-w4f.mp4"', () => {
    let title ="rick.[nsfw]and.morty-w4f.mp4";
    let nsfw = isNSFWMedia(title);
  expect(nsfw).toBe(true);
});