console.log('route');


$(window).on('popstate', function(event) {
  route();
});


$(document.body).on('click', 'a', function(e) {
  var href = $(this).attr('href');
  
  if (href.indexOf('/') == 0) {
    e.preventDefault();
    route(href);
  }
});


function route(href) {
  href = href || location.pathname + location.search;
  console.log('route', href);
  var prefix = 'mashmc-';
  
  var appName = href.split('/')[1];
  appName = appName && prefix + appName;

  $('.mashmc-app-active').removeClass('mashmc-app-active');
  $('.mashmc-app-' + appName).addClass('mashmc-app-active');
  history.pushState({}, '', href);
}


route();


module.exports = route;