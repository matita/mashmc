var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  lib = require('./lib/library'),
  api = require('./lib/api')(app, lib),
  Filer = require('./content/filer.js');

var port = 3000;

var filer = new Filer(lib);
var now = new Date();
filer
  .addPath('\\\\openelec\\TOSHIBA EXT\\video'/*'c:\\archivio\\video\\film'*/)
  .on('end', function(path) {
    console.log('end of crawling', path, '(' + (new Date().getTime() - now.getTime()) + 'ms)');
  });

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/media/:id', function(req, res) {
  var mediaId = req.params.id,
    items = lib.get({ _id: mediaId }).sort(function(item1, item2) {
      return item1.ext < item2.ext ? -1 :
        item1.ext > item2.ext ? 1 :
        0;
    });
  if (!items.length)
    res.send('No media with id ' + mediaId);
  else {
    //res.set('Content-Type', 'video/mp4');
    res.sendFile(items[0].filePath);
  }
});

app.listen(port, function() {
  console.log('http server listening on port', port);
});