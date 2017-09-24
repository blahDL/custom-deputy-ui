import angular from 'angular';

(function() {
	'use strict';

	angular.module('Deputy').service('DataService', DataService);

	DataService.$inject = ['$http'];
	function DataService($http) {
		//const baseUrl = `https://${process.env.DEPUTY_API_HOST}/api/v1`;
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
