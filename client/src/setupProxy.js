const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',  //프론트 타겟을 5000번으로 설정
      changeOrigin: true,
    })
  );
};

