// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require('http-proxy-middleware')

console.log('proxy---------------------')
module.exports = (req, res) => {
  let target = ''
  console.log(req.url, '---------')
  // 代理目标地址
  // xxxxx 替换为你跨域请求的服务器 如： http://baidu.com
  if (req.url.startsWith('/api-prod')) {
    // 这里填目标地址
    target = 'https://api.imooc-front.lgdsunday.club/'
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api-prod`
      // 例如 /api/user/login 将被转发到 http://target/user/login
      // '^/api-prod/': '/api'
    }
  })(req, res)
}
