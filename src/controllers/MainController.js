import angular from 'angular';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

(function() {
	'use strict';

	angular.module('Deputy').controller('MainController', MainController);

	MainController.$inject = ['DataService'];
	function MainController(DataService) {
		var vm = this;

		vm.momentFormat = 'YYYY-MM-DD';

		vm.showHead = showHead;
		vm.showFoot = showFoot;

		vm.startDate = moment().toDate();
		vm.endDate = moment()
			.add(4, 'weeks')
			.toDate();
		vm.updateEndDate = updateEndDate;

		vm.readRosters = readRosters;
		vm.dateRange = [];
		vm.shiftRange = shiftRange;

		vm.totalForDate = totalForDate;
		vm.shiftClass = shiftClass;

		////////////////

		function shiftRange(roster) {
			return vm.dateRange.map(function(date) {
				return roster.find(function(shift) {
					return moment(shift.Date).isSame(date, 'day');
				});
			});
		}

		function readRosters(startDate, endDate) {
			vm.previousOperationalUnit = null;
			vm.currentOperationalUnit = null;
			vm.dateRange = Array.from(
				moment.range(vm.startDate, vm.endDate).by('day')
			);
			startDate = moment(startDate).format(vm.momentFormat);
			endDate = moment(endDate).format(vm.momentFormat);
			DataService.rosters(startDate, endDate).then(function(response) {
				vm.rosters = response;
			});
		}

		function showHead(roster) {
			const result = vm.currentOperationalUnit != roster[0].OperationalUnit;

			if (result) {
				vm.previousOperationalUnit = vm.currentOperationalUnit;
				vm.currentOperationalUnit = roster[0].OperationalUnit;
			}

			return result;
		}

		function showFoot(roster) {
			const result = vm.currentOperationalUnit != roster[0].OperationalUnit;
			return result;
		}

		function totalForDate(date, shift) {
			let list = vm.rosters.filter(function(item) {
				let hour = moment(item.StartTimeLocalized).hour();
				return (
					item.OperationalUnit === vm.previousOperationalUnit &&
					moment(item.StartTimeLocalized).isSame(date, 'day') &&
					((shift === 'day' && hour <= 12) || (shift === 'night' && hour > 12))
				);
			});

			return list.length;
		}

		function shiftClass(shift) {
			if (!shift) return;

			var result = [];
			if (moment(shift.StartTimeLocalized).hour() <= 12) {
				result.push('success');
			} else {
				result.push('info');
			}
			return result;
		}

		function updateEndDate() {
			vm.endDate = moment(vm.startDate)
				.add(4, 'weeks')
				.toDate();
		}
	}
})();
