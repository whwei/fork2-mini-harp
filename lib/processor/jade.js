var jade = require('jade'),
    fs = require('fs'),
    path = require('path');

module.exports = makeJade;

function makeJade(root) {
  return function(req, res, next) {
    if (path.extname(req.url) !== '.html') {
      return next();
    } else {
      fs.readFile(root + req.url, {encoding: 'utf8'}, function(err, file) {
        if (err) {
          fs.readFile(root + req.url.replace('.html', '.jade'), {encoding: 'utf8'}, function(error, data) {
            if (error) {
              return next();
            } else {
              var html = jade.compile(data)({});
              res.writeHead(200, {
                'Content-Length': html.length,
                'Content-Type': 'text/html; charset=UTF-8'
              });
              res.end(html);
            }
          
          });
        } else {
          res.writeHead(200, {
            'Content-Length': file.length,
            'Content-Type': 'text/html; charset=UTF-8'
          });
          res.end(file);
        }

      });
    }
  };
};