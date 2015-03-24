var express = require('express'),
  app = express(),
  http = require('http').Server(app),
  lib = require('./lib/library'),
  api = require('./lib/api')(app, lib);

var port = 3000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/media/:id', function(req, res) {
  var mediaId = req.params.id,
    items = lib.get({ _id: mediaId });
  if (!items.length)
    res.send('No media with id ' + mediaId);
  else {
    //res.set('Content-Type', 'video/mp4');
    res.sendFile(items[0].filePath);
  }
});

app.listen(port, function() {
  console.log('http server listening on port', port);

  var fs = require('fs');
  var path = require('path');
  var dir = '\\\\openelec\\TOSHIBA EXT\\video';//'c:\\archivio\\video\\film\\Hayao Miyazaki';
  fs.readdir(dir, function(err, files) {
    if (err)
      return console.error(err);

    files.forEach(function(file) {
      var ext = path.extname(file);
      var fileName = path.basename(file, ext);

      lib.add({
        type: 'video',
        title: fileName,
        filePath: dir + path.sep + file,
        ext: ext
      });
    });
  });
});