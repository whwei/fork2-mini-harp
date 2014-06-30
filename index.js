var connect = require('connect');
var serveStatic = require('serve-static');

module.exports = function(dir) {
  var app = connect()
    .use(function(req, res, next) {
      if (req.url === '/current-time') {
        res.end((new Date).toISOString());
      } else {
        next();
      }
    })
    .use(serveStatic(dir));

    return app;
};