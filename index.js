var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');

module.exports = function(dir) {
  var app = connect()
    .use(function(req, res, next) {
      if (req.url === '/current-time') {
        res.end((new Date).toISOString());
      } else {
        next();
      }
    })
    .use(makeJade(dir))
    .use(serveStatic(dir));

    return app;
};