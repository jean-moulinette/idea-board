const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/app.ts',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'main.js',
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({
      configFile: 'tsconfig.json',
    })],
  },

  target: 'node',

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(
      [
        '../dist/*',
      ],
      {
        allowExternal: true,
      }),
  ],

  stats: {
    // Will filter out warning from node_modules
    warningsFilter: warning => !!warning.includes('./node_modules'),
  },
}
