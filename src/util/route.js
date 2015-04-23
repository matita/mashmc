console.log('route');


$(window).on('popstate', function(event) {
  console.log('popstate fired!');
});


$(document.body).on('click', 'a', function(e) {
  var href = $(this).attr('href');
  console.log('href', href);
  e.preventDefault();
});


module.exports = function(route) {

}