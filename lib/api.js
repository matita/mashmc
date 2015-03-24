function api(app, lib) {
  app.route('/api/media')
    .get(function(req, res) {
      res.send(JSON.stringify(lib.get(req.query)));
    });
}

module.exports = api;