import angular from 'angular';

(function() {
	'use strict';

	angular.module('Deputy', ['ngSanitize', 'angular.filter']).run([
		'$http',
		function($httpProvider) {
			$httpProvider.defaults.headers.common.Authorization =
				'OAuth ' + process.env.DEPUTY_API_KEY;
		}
	]);
})();
