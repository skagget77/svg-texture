const path = require("path");

module.exports = {
    entry: {
	app: "./src/index.ts",
	test: "./test/index.ts"
    },
    module: {
	rules: [{
	    test: /\.tsx?$/,
	    use: 'ts-loader',
	    exclude: /node_modules/
	}]
    },
    resolve: {
	extensions: ['.js', '.ts', '.tsx']
    },
    output: {
	filename: "[name].bundle.js",
	path: path.resolve(__dirname, "dist")
    },
};
