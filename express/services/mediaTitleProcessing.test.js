var { isNSFWMedia } = require('./mediaTitleProcessing');

const titles = [
  { title: "rick.and.morty-w4f[nsfw].mp4", shouldReturn: true },
  { title: "rick.[nsfw]and.morty-w4f.mp4", shouldReturn: true },
  { title: "rick.and.morty-w4f.mp4", shouldReturn: false }
];

describe('isNSFWMedia()', () => {
  titles.forEach(el => {
    test(`should return ${el.shouldReturn} for ${el.title}`, () => {
      let title = el.title;
      let nsfw = isNSFWMedia(title);
      expect(nsfw).toBe(el.shouldReturn);
    });

  });
});
