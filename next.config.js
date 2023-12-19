module.exports ={
  webpack:(config,options)=>{
    const isServer = options.isServer
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [
        {
          loader:'file-loader',
          options:{
            name: '[name].[hash].[ext]',
            outputPath: 'static', // 硬盘路径
            publicPath:  '_next/static' // 网站访问路径
          }
        }
      ]
    })
    return config
  },
  experimental: {
    newNextLinkBehavior: false,
  },
}