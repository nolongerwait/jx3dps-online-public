// babel.config.js 或 .babelrc
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    // 这是关键配置项 ↓
    [
      'import',
      {
        libraryName: 'antd', // 按需加载的库名
        libraryDirectory: 'es', // ES Module 格式
        style: true, // 自动加载样式
      },
      'antd', // 唯一标识 (可选)
    ],
  ],
}
