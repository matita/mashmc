var events = require('events'),
  util = require('util');

function Library() {
  var me = this,
    items = [],
    id = 0;

  me.add = function(item) {
    item = JSON.parse(JSON.stringify(item));
    item._id = 'id_' + (id++);
    items.push(item);
    me.emit('add', item);
    return me;
  }

  me.get = function(filter) {
    if (!filter)
      filter = {};

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