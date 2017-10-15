const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const publicDirectoryPath = "../../server/public"
const templateDirectoryPath = "../../server/src/view-templates"

const publicDirectory = path.resolve(__dirname, publicDirectoryPath)
const htmlTemplate = path.resolve(__dirname, `${templateDirectoryPath}/index.html`)

module.exports = {

	entry: {
    main: "./src/index.ts",
  },

	output: {
		path: publicDirectory,
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
    new CleanWebpackPlugin(
    [
        '../../server/public/*'
    ],
    {
       allowExternal: true,
    }),
		new ExtractTextPlugin("[name].[hash].css"),
    new HtmlWebpackPlugin({
      title: 'Idea Board',
      template: htmlTemplate,
      inject: true
    }),
	]

}
