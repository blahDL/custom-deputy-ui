const Service = require('node-windows').Service;
const path = require('path');

const args = process.argv.slice(2);

var svc = new Service({
	name: 'Deputy Custom UI',
	description: 'Windows Service to run Custom Deputy UI',
	script: path.resolve(__dirname, 'service.js'),
	env: [
		{
			name: 'DEPUTY_API_HOST',
			value: process.env['DEPUTY_API_HOST']
		},
		{
			name: 'DEPUTY_API_KEY',
			value: process.env['DEPUTY_API_KEY']
		}
	]
});

svc.on('install', function() {
	svc.start();
});

if (args.length === 0 || args[0] === 'install') {
	console.log('Installing windows service...');
	svc.install();
} else if (args[0] === 'uninstall') {
	console.log('Uninstalling windows service...');
	svc.uninstall();
}
