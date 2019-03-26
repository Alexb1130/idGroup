const path = require('path');

module.exports = {
	entry: ["./src/scripts/main.js"],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js'
    },
    mode: 'production',
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
                loader: "babel-loader",
			}
		}]
	}
}