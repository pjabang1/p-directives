angular.module('Pension').controller('ViewFundCtrl', ['$scope', '$filter', 'ngTableParams', 'dataFactory', '$stateParams', function($scope, $filter, ngTableParams, dataFactory, $stateParams) {
		$scope.fund = $stateParams.fund;

		$scope.data = {};

		$scope.data.fundSectors = [];



		$scope.fundDetailsParams = new ngTableParams({
			page: 1, // show first page
			count: 10, // count per page
			sorting: {
				fondtyp: 'asc'     // initial sorting
			}
		}, {
			total: 0, // length of data
			getData: function($defer, params) {
				// use build-in angular filter
				dataFactory.getFundDetails($scope.fund)
						.success(function(data) {
							// console.log(data.length);
							// data = response;
							// update table params
							params.total(data.length);

							// set new data
							var orderedData = params.sorting() ?
									$filter('orderBy')(data, params.orderBy()) :
									data;

							$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
						})
						.error(function(error) {
							$scope.status = 'Unable to load customer data: ' + error.message;
						});

			}
		});

		$scope.fundSectorsParams = new ngTableParams({
			page: 1, // show first page
			count: 10, // count per page
			sorting: {
				fondtyp: 'asc'     // initial sorting
			}
		}, {
			total: 0, // length of data
			getData: function($defer, params) {
				// use build-in angular filter
				dataFactory.getFundSectors($scope.fund)
						.success(function(data) {
							// console.log(data.length);
							// data = response;
							// update table params
							$scope.data.fundSectors = [];
							angular.forEach(data, function(value, key) {
								if(value.sector === null) {
									value.sector = 'Other';
								}
								$scope.data.fundSectors.push({"label": value.sector, "value": parseFloat(value.holdingpercent)});
							});
							params.total(data.length);
							// set new data
							var orderedData = params.sorting() ?
									$filter('orderBy')(data, params.orderBy()) :
									data;

							$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
						})
						.error(function(error) {
							$scope.status = 'Unable to load customer data: ' + error.message;
						});

			}
		});

		$scope.fundCountriesParams = new ngTableParams({
			page: 1, // show first page
			count: 10, // count per page
			sorting: {
				fondtyp: 'asc'     // initial sorting
			}
		}, {
			total: 0, // length of data
			getData: function($defer, params) {
				// use build-in angular filter
				dataFactory.getFundCountries($scope.fund)
						.success(function(data) {
							// console.log(data.length);
							// data = response;
							// update table params
							params.total(data.length);
							// set new data
							var orderedData = params.sorting() ?
									$filter('orderBy')(data, params.orderBy()) :
									data;

							$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
						})
						.error(function(error) {
							$scope.status = 'Unable to load customer data: ' + error.message;
						});

			}
		});

	}]);