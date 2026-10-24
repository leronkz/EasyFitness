const { createProxyMiddleware } = require('http-proxy-middleware');

const rewriteFn = function (path, req) {
  return path;
}

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:7008',
      secure: false,
      changeOrigin: true,
      localAddress: false,
      pathRewrite: rewriteFn,
    })
  )
}