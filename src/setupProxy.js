const { createProxyMiddleware } = require('http-proxy-middleware')

// 网关
module.exports = function (app) {
  app.use(createProxyMiddleware('/apiInterface/interface', {
    // target: `http://192.168.20.177:15001/`,
    target: `https://api-gateway.cjm3.kf315.net/`,
    changeOrigin: true,
    cookieDomainRewrite: {
      '*': 'localhost', // 把相应的 cookie 域都设置成 localhost，或者指定的域名
    },
    pathRewrite: {
      '^/apiInterface/interface': '/',
      '^/interface': '/',
    },
  }))
};
