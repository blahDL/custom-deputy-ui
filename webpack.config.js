const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
	filename: 'style.css'
});

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
				target: 'https://' + process.env.DEPUTY_API_HOST,
				changeOrigin: true
			}
		}
	},
	plugins: [
		new InlineEnvironmentVariablesPlugin(['DEPUTY_API_KEY', 'DEPUTY_API_HOST']),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Deputy',
			template: './src/index.html'
		}),
		extractLess
	],
	module: {
		rules: [
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: ['file-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.less$/,
				use: extractLess.extract({
					use: [
						{
							loader: 'css-loader'
						},
						{
							loader: 'less-loader'
						}
					],
					// use style-loader in development
					fallback: 'style-loader'
				})
			}
		]
	}
};
