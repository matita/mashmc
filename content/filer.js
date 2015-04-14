var walk = require('../utils/lazywalker');//require('walkdir');
var path = require('path');
var events = require('events');
var util = require('util');


function Filer(lib) {
  var me = this;

  me.addPath = function(path) {
    var walker = walk(path);

    walker
      .on('file', function(filepath, stat) {
        var media = serializeFile(filepath);
        if (media)
          lib.media.add(media);
      })
      .on('end', function() {
        me.emit('end', path);
      });
    
    return me;
  };
};

util.inherits(Filer, events.EventEmitter);



function serializeFile(filepath) {
  var ext = path.extname(filepath);
  var basename = path.basename(filepath, ext);

  return {
    category: 'media',
    type: getType(ext),
    title: basename,
    filePath: filepath,
    ext: ext
  };
}


function getType(ext) {
  var videoExts = [
      'mp4',
      'mov',
      'avi',
      'mkv',
      'm4v',
      'flv',
      'wmv'
    ],
    audioExts = [
      'mp3',
      'wav'
    ],
    imageExts = [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'bmp'
    ];

  ext = ext.toLowerCase().replace(/^\./, '');
  if (videoExts.indexOf(ext) != -1)
    return 'video';
  else if (audioExts.indexOf(ext) != -1)
    return 'audio';
  else if (imageExts.indexOf(ext) != -1)
    return 'image';
  else
    return 'unknown';
}

module.exports = Filer;