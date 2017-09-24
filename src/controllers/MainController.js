import angular from 'angular';

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
