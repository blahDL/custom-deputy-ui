const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		proxy: {
			'/api': {
				target: 'https://psba.au.deputy.com',
				changeOrigin: true
			}
		}
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Deputy',
			template: './src/index.html'
		})
	]
};
