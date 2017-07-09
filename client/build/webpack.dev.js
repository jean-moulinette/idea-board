const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverPath  = "../../server"

module.exports = {

	entry: {
    main: "./src/index.ts",
  },

	output: {
		path: path.resolve(__dirname, `${serverPath}/public`),
		filename: "[name].[hash].js",
	},

	devtool: "inline-source-map",

	resolve: {
		extensions: [".ts"]
	},

	module: {

		rules: [
			{
				test: /\.ts$/,
				loader: "awesome-typescript-loader"
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					loader: 'css-raw-loader!sass-loader'
				})
			}
		]
	},

	plugins: [
		new ExtractTextPlugin("[name].[hash].css"),
    new HtmlWebpackPlugin({
      title: 'Idea Board',
      template: path.resolve(__dirname, `${serverPath}/src/view-templates/index.html`),
      inject: true
    }),
	]

}
