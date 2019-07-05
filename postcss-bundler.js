// Declare all PostCSS dependencies below.
const postcss = require('postcss');
const postcssEasyImport = require('postcss-easy-import'); 
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fs = require('fs'); // Node dependency for file system access.

fs.readFile('./assets/css/src/postcss.css', (err, css) => {
  if (err) console.log(err);
  postcss([autoprefixer, postcssEasyImport /*, cssnano*/]) // Insert plugins into an array and insert said array as an argument for the postcss function.
  .process(css, { from: './assets/css/src/postcss.css', to: './assets/css/dist/style.css' }) // Define origin and destination directories.
    .then(result => { // If successful, return the result object, write the CSS to a file called "style.css", and return true using a callback via the fat arrow syntax.
      fs.writeFile('./assets/css/dist/style.css', result.css, () => true);
      if ( result.map ) {
        fs.writeFile('./assets/css/dist/style.css.map', result.map, () => true); // If there's a source map, do the same thing for the source map.
      }
    }).catch(promErr => console.log(promErr));
}); 