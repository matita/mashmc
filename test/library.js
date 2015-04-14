var expect = require('expect.js');

describe('library', function() {
  var lib = require('../lib/library');

  it('should have a chainable add method', function() {
    expect(lib.media).to.have.property('add');
    expect(lib.media.add({ title: 'item' })).to.equal(lib.media);
  });

  it('should have a get method', function() {
    expect(lib.media).to.have.property('get');
  });

  it('that can also accept an object parameter to use as a filter', function() {
    var title = 'title' + Math.random(),
      item = { title: title };
    lib.media.add(item);
    expect(lib.media.get({ title: 'other title' + Math.random() })).to.have.length(0);
    expect(lib.media.get({ title: title })).to.have.length(1);
  })

  it('items added should have an _id property after insertion', function() {
    var item = { title: 'something' };
    expect(item).not.to.have.property('_id');
    lib.media.add(item);
    item = lib.media.get({ title: 'something' })[0];
    expect(item).to.have.property('_id');
  })
});
