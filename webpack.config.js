const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
	entry: "./src/index.mobx.tsx",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			}
		]
	},
	devtool: "source-map",

	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist")
	}
}
