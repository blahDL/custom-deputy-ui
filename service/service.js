const webpack = require('webpack');
const devServer = require('webpack-dev-server');

const config = require('../webpack.config.js');

const compiler = webpack(config);

const server = new devServer(compiler, config.devServer);

const port = config.devServer.port || 8080;
const host = config.devServer.host || '0.0.0.0';

server.listen(port, host, () => {
	console.log('Server started on: ' + host + ':' + port);
});
