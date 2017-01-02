const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {

	entry: "./src/index.ts",

	output: {
		path: path.resolve(__dirname, "../../server/public"),
		filename: "bundle.js",
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
		new ExtractTextPlugin("styles.css")
	]

}
