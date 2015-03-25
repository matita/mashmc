var walk = require('walkdir');
var path = require('path');
var events = require('events');
var util = require('util');


function Filer(lib) {
  var me = this;

  me.addPath = function(path) {
    var walker = walk(path);

    walker
      .on('file', function(filepath, stat) {
        lib.add(serializeFile(filepath));
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
    type: 'video',
    title: basename,
    filePath: filepath,
    ext: ext
  };
}

module.exports = Filer;