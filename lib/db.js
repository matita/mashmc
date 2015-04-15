var Datastore = require('nedb');

var db = new Datastore({
  filename: 'mashmc.db',
  autoload: true
});

module.exports = db;