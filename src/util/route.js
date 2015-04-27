$(window).on('popstate', function(event) {
  route();
});


$(document.body).on('click', 'a', function(e) {
  var href = $(this).attr('href');
  
  if (href.indexOf('http') !== 0) {
    e.preventDefault();
    route(href);
  }
});


function route(href) {
  href = href || location.pathname + location.search;
  console.log('route', href);
  var prefix = 'mashmc-';
  
  var paths = href.split('/');
  var appName = paths[1];
  appName = appName && prefix + appName;

  $('.mashmc-app-active').removeClass('mashmc-app-active');
  $('.mashmc-app-' + appName).addClass('mashmc-app-active');
  history.pushState({}, '', paths.join('/'));

  var app = mashmc.apps[appName];
  console.log('app', app, appName);
  if (app)
    app.route.apply(app, paths.slice(2));
}

$(function() {
  route();
});


module.exports = route;