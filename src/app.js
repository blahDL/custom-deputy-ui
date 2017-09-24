import angular from 'angular';
import 'angular-bootstrap';

(function() {
	'use strict';

	angular.module('Deputy', []).run([
		'$http',
		function($httpProvider) {
			$httpProvider.defaults.headers.common.Authorization =
				'OAuth ' + process.env.DEPUTY_API_KEY;
		}
	]);
})();
