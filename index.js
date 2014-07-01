var connect = require('connect');
var path = require('path');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');

module.exports = function(dir) {
  var app = connect()
    .use(function(req, res, next) {
      if (req.url === '/current-time') {
        res.end((new Date).toISOString());
      } else {
        next();
      }
    })
    .use(function(req, res, next) {
      var ext = path.extname(req.url);
      if (ext === '.jade' || ext === '.less') {
        res.writeHead(404);
        res.end();
      } else {
        next();
      }
    })
    .use(function(req, res, next) {
      if (req.url === '/') {
        req.url = '/index.html';
      }
      next();        
      
    })
    .use(makeJade(dir))
    .use(makeLess(dir))
    .use(serveStatic(dir));

    return app;
};