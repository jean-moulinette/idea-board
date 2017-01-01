const path = require('path')

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
			}
		]
	}

}
