import angular from 'angular';

(function() {
	'use strict';

	angular.module('Deputy').service('DataService', DataService);

	DataService.$inject = ['$http'];
	function DataService($http) {
		//const baseUrl = `https://${process.env.DEPUTY_API_HOST}/api/v1`;
		const baseUrl = '/api/v1';

		this.rosters = rosters;
		this.leave = leave;

		////////////////

		function leave(startDate, endDate) {
			const request = {
				search: {
					awaitingApproval: {
						field: 'Status',
						data: 0,
						type: 'ge'
					},
					approved: {
						field: 'Status',
						data: 1,
						type: 'le'
					}
				},
				sort: {
					Employee: 'asc'
				},
				start: 0
			};

			if (startDate) {
				request.search.startDate = {
					field: 'DateEnd',
					data: startDate,
					type: 'ge'
				};
			}

			if (endDate) {
				request.search.endDate = {
					field: 'DateStart',
					data: endDate,
					type: 'le'
				};
			}

			return recursiveCall(baseUrl + '/resource/Leave/QUERY', request);
		}

		function rosters(startDate, endDate) {
			const request = {
				search: {
					employee: {
						field: 'Employee',
						data: 0,
						type: 'ne'
					}
				},
				sort: {
					OperationalUnit: 'asc',
					Employee: 'asc'
				},
				start: 0
			};

			if (startDate) {
				request.search.startDate = {
					field: 'Date',
					data: startDate,
					type: 'ge'
				};
			}

			if (endDate) {
				request.search.endDate = {
					field: 'Date',
					data: endDate,
					type: 'le'
				};
			}

			return recursiveCall(baseUrl + '/resource/Roster/QUERY', request);
		}

		function recursiveCall(endpoint, request) {
			return $http.post(endpoint, request).then(function(response) {
				if (Array.isArray(response.data) && response.data.length === 500) {
					request.start = request.start + 500;
					return recursiveCall(endpoint, request).then(function(
						recursiveResponse
					) {
						return response.data.concat(recursiveResponse);
					});
				}
				return response.data;
			});
		}
	}
})();

/*
Here is the JavaScript console way you can try it:

$.post("/api/v1/resource/Roster/QUERY" , JSON.stringify({search:{f1:{field:"Date",data:"2016-10-01",type:"ge"},f2:{field:"Date",data:"2016-10-31",type:"le"}}}) , _client_log)

*/
