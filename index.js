var json2html = require('node-json2html');
var csv2json = require('csvtojson');
var writeFile = require('write');
var fs = require('fs');

var csv = 'law-review-abbreviations.csv'

function json(){
  csv2json()
  .fromFile(csv)
  .then((js)=>{
      writeFile('dist/law-review-abbreviations.json', JSON.stringify(js));
  })
}

function html(data){
  var transform = {'<>':'li','html':[
    {'<>':'a', 'target':'_blank', 'href':'${URL}', 'text':'${Journal Name}'},
    {'<>':'span', 'text':' (${Abbreviation})'},
  ]};

  var bod = json2html.transform(data,transform);
  return bod;
};

function web(data){
  var front = fs.readFileSync('html/front.html', 'utf8');
  var back = fs.readFileSync('html/back.html', 'utf8');
  var page = front + data + back;
  return page;
}

json();
var data = JSON.parse(fs.readFileSync('dist/law-review-abbreviations.json', 'utf8'));

var bod = html(data);

var web = web(bod);
writeFile('docs/index.html', web);
