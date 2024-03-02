// eslint-disable-next-line import/no-extraneous-dependencies
const CleanCSS = require('clean-css');
const fs = require('fs');

fs.readFile('src/styles/main.css', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const output = new CleanCSS({}).minify(data);
  // eslint-disable-next-line no-shadow
  fs.writeFile('src/styles/main.min.css', output.styles, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('CSS minification complete.');
  });
});
