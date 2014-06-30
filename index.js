var connect = require('connect');

module.exports = function() {
  return connect().use(function(req, res, next) {
    console.log(req.url)
    if (req.url === '/current-time') {
      res.end((new Date).toISOString());
    } else {
      res.end('Cannot Get ' + req.url);
    }
  });
};