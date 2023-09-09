const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'block': './src/block.js',
    'style': './src/style.css'  // Add the CSS file as an entry point
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'  // Use [name] to output based on entry point names
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],  // Add rule for CSS files
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',  // Output CSS files based on entry point names
      chunkFilename: '[id].css',
    }),
  ],
  mode: 'development'
};