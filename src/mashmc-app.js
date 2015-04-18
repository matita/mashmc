module.exports = function(app) {
  
  var BaseApp = function() { };

  BaseApp.prototype.api = {
    get: function() {
      arguments[0] = app.url + arguments[0];
      return $.get.apply($, arguments);
    }
  }

  var rootSelector = '.mashmc-app-' + app.name;
  BaseApp.prototype.$root = $(rootSelector);

  BaseApp.prototype.tmpl = {};
  console.log('root selector', rootSelector, $(rootSelector + ' script[class^="tmpl-"]'));
  $(rootSelector + ' script[class^="tmpl-"]').each(function() {
    var $this = $(this),
      className = $this.attr('class').split(' ').shift(),
      name = className.replace(/^tmpl-/, '');
    console.log('found tmpl', name);
    BaseApp.prototype.tmpl[name] = Handlebars.compile($this.html());
  });



  return BaseApp;

}