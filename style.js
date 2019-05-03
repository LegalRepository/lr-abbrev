var CleanCSS = require('clean-css');
var writeFile = require('write');
var fs = require('fs');

var input = fs.readFileSync('docs/style.css', 'utf8');
var output = new CleanCSS().minify(input);
writeFile('docs/style.min.css', output.styles);
