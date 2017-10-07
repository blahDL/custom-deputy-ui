const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InlineEnvironmentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonChunksPlugin = require('webpack').optimize.CommonsChunkPlugin;

const extractSass = new ExtractTextPlugin({
	filename: '[name].css'
});

module.exports = {
	entry: {
		lib: path.resolve(__dirname, 'src/lib.js'),
		app: path.resolve(__dirname, 'src/app.js'),
		style: path.resolve(__dirname, 'src/style.scss')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map',
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		contentBase: path.resolve(__dirname, 'dist'),
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
		new CommonChunksPlugin({
			name: 'lib'
		}),
		extractSass
	],
	module: {
		rules: [
			{
				test: /\.(woff2?|eot|[ot]tf|svg)$/,
				use: ['file-loader']
			},
			{
				test: /\.glob$/,
				use: ['glob-loader']
			},
			{
				test: /\.s[ac]ss$/,
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader'
						}
					],
					fallback: 'style-loader'
				})
			}
		]
	}
};
