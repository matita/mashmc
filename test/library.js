var expect = require('expect.js');

describe('library', function() {
  var lib = require('../lib/library');

  it('should have a chainable add method', function() {
    expect(lib).to.have.property('add');
    expect(lib.add({ title: 'item' })).to.equal(lib);
  });

  it('should have a get method', function() {
    expect(lib).to.have.property('get');
  });

  it('that can also accept an object parameter to use as a filter', function() {
    var title = 'title' + Math.random(),
      item = { title: title };
    lib.add(item);
    expect(lib.get({ title: 'other title' + Math.random() })).to.have.length(0);
    expect(lib.get({ title: title })).to.have.length(1);
  })

  it('items added should have an _id property after insertion', function() {
    var item = { title: 'something' };
    expect(item).not.to.have.property('_id');
    lib.add(item);
    item = lib.get({ title: 'something' })[0];
    expect(item).to.have.property('_id');
  })
});
