var events = require('events'),
  util = require('util');

function Library() {
  var me = this;
  
  me.items = [];

  me.media = new Media(me);
}


function Media(lib) {
  var me = this,
    items = lib.items,
    id = 0;

  me.add = function(item) {
    item = JSON.parse(JSON.stringify(item));
    item._id = 'id_' + (id++);
    item.category = 'media';
    items.push(item);
    lib.emit('add', item);
    return me;
  }

  me.get = function(filter) {
    if (!filter)
      filter = {};
    filter.category = 'media';

    return items.filter(function(item) {
      for (var f in filter)
        if (item[f] != filter[f])
          return false;
      return true;
    });
  }
}

util.inherits(Library, events.EventEmitter);

module.exports = new Library();