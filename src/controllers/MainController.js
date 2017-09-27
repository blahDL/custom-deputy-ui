import angular from 'angular';

(function() {
	'use strict';

	angular.module('Deputy').controller('MainController', MainController);

	MainController.$inject = ['DataService'];
	function MainController(DataService) {
		var vm = this;
		vm.prevArea = null;
		vm.showArea = showArea;

		rosters('2017-09-27', '2017-10-30');

		////////////////

		function rosters(startDate, endDate) {
			DataService.rosters(startDate, endDate).then(function(response) {
				vm.rosters = response;
			});
		}

		function showArea(roster) {
			const result =
				vm.prevArea !=
				roster[0]._DPMetaData.OperationalUnitInfo.OperationalUnitName;
			vm.prevArea =
				roster[0]._DPMetaData.OperationalUnitInfo.OperationalUnitName;
			return result;
		}
	}
})();
