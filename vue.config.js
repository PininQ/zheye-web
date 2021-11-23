const baseURL = 'http://api.vikingship.xyz'

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: baseURL,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // 路径重写
          '/api': '/api', // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
        },
      },
    },
  },
}
