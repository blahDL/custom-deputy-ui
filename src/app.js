import angular from 'angular';
import 'angular-bootstrap';
import 'angular-filter';

(function() {
	'use strict';

	angular.module('Deputy', ['angular.filter']).run([
		'$http',
		function($httpProvider) {
			$httpProvider.defaults.headers.common.Authorization =
				'OAuth ' + process.env.DEPUTY_API_KEY;
		}
	]);
})();
