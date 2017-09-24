import 'angular';
import 'angular-bootstrap';

// app.js
(function() {
	'use strict';

	angular.module('Deputy', []).run([
		'$http',
		function($httpProvider) {
			$httpProvider.defaults.headers.common.Authorization =
				'OAuth <insert key here>';
		}
	]);
})();

// MainController.js
(function() {
	'use strict';

	angular.module('Deputy').controller('MainController', MainController);

	MainController.$inject = ['$scope', 'DataService'];
	function MainController($scope, DataService) {
		var vm = this;
		// vm.areas = [];

		locations();
		areas();
		employees();
		rosters();

		////////////////

		function locations() {
			DataService.locations().then(function(response) {
				vm.locations = response;
			});
		}

		function areas() {
			DataService.areas().then(function(response) {
				vm.areas = response;
			});
		}

		function employees() {
			DataService.employees().then(function(response) {
				vm.employees = response;
			});
		}

		function rosters() {
			DataService.rosters().then(function(response) {
				vm.rosters = response;
			});
		}
	}
})();

// DataService.js
(function() {
	'use strict';

	angular.module('Deputy').service('DataService', DataService);

	DataService.$inject = ['$http'];
	function DataService($http) {
		// const baseUrl = 'https://psba.au.deputy.com/api/v1';
		const baseUrl = '/api/v1';

		this.locations = locations;
		this.areas = areas;
		this.employees = employees;
		this.rosters = rosters;

		////////////////

		function locations() {
			return $http
				.post(baseUrl + '/resource/Company/QUERY')
				.then(function(response) {
					return response.data;
				});
		}

		function areas() {
			return $http
				.post(baseUrl + '/resource/OperationalUnit/QUERY')
				.then(function(response) {
					return response.data;
				});
		}

		function employees() {
			return $http
				.post(baseUrl + '/resource/Employee/QUERY')
				.then(function(response) {
					return response.data;
				});
		}

		function rosters() {
			return $http
				.post(baseUrl + '/resource/Roster/QUERY')
				.then(function(response) {
					return response.data;
				});
		}
	}
})();

/*
Here is the JavaScript console way you can try it:

$.post("/api/v1/resource/Roster/QUERY" , JSON.stringify({search:{f1:{field:"Date",data:"2016-10-01",type:"ge"},f2:{field:"Date",data:"2016-10-31",type:"le"}}}) , _client_log)

*/
