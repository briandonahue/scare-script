const proxy = require('http-proxy-middleware');

module.exports = function(app) {

  // proxy websocket
  app.use(proxy('/socket', {
    target: 'http://localhost:8080/',
    changeOrigin: true,
    ws: true,
    logLevel: 'debug'
  }));
};