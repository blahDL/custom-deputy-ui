import angular from 'angular';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

(function() {
	'use strict';

	angular.module('Deputy').controller('MainController', MainController);

	MainController.$inject = ['$q', 'DataService'];
	function MainController($q, DataService) {
		var vm = this;
		vm.loading = false;

		vm.momentFormat = 'YYYY-MM-DD';

		vm.showHead = showHead;
		vm.showFoot = showFoot;

		vm.updateEndDate = updateEndDate;
		vm.startDate = moment().toDate();
		updateEndDate();

		vm.readRosters = readRosters;
		vm.dateRange = [];
		vm.shiftRange = shiftRange;

		vm.totalForDate = totalForDate;
		vm.shiftText = shiftText;
		vm.shiftClass = shiftClass;

		////////////////

		function shiftRange(roster) {
			return vm.dateRange.map(function(date) {
				return (
					vm.leave.find(function(leave) {
						return (
							leave.Employee === roster[0].Employee &&
							date.isBetween(leave.DateStart, leave.DateEnd)
						);
					}) ||
					roster.find(function(shift) {
						return moment(shift.Date).isSame(date, 'day');
					})
				);
			});
		}

		function readRosters() {
			vm.rosters = null;
			vm.leave = null;
			vm.previousOperationalUnit = null;
			vm.currentOperationalUnit = null;
			vm.dateRange = Array.from(
				moment.range(vm.startDate, vm.endDate).by('day')
			);

			const startDate = moment(vm.startDate).format(vm.momentFormat);
			const endDate = moment(vm.endDate).format(vm.momentFormat);
			vm.loading = true;

			$q
				.all({
					rosters: DataService.rosters(startDate, endDate),
					leave: DataService.leave(startDate, endDate)
				})
				.then(function(response) {
					vm.rosters = response.rosters;
					vm.leave = response.leave;
					vm.loading = false;
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

		function shiftText(shift) {
			if (!shift) return;

			if (shift.hasOwnProperty('Status')) {
				return 'LEAVE';
			}

			return shift.Comment;
		}

		function shiftClass(shift) {
			if (!shift) return;

			var result = [];
			if (shift.hasOwnProperty('Status')) {
				result.push(shift.Status == 0 ? 'warning' : 'danger');
			} else if (moment(shift.StartTimeLocalized).hour() <= 12) {
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
