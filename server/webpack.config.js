require("webpack")
const path = require("path")
const nodeExternals = require("webpack-node-externals")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const VENDORS = [
	"cors",
	"dotenv",
	"express",
	"regenerator-runtime",
	"mongoose",
	"bcrypt",
	"cookie-parser",
	"jsonwebtoken",
]

module.exports = {
	mode: "production",
	entry: {
		main: "./server/index.js",
		vendor: VENDORS,
	},
	output: {
		filename: "[name]-[contenthash].js",
		path: path.resolve(__dirname, "..", "dist"),
	},
	target: "node",
	node: {
		__filename: false,
		__dirname: false,
	},
	externals: [nodeExternals()],
	plugins: [new CleanWebpackPlugin()],
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
}
