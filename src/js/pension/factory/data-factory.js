angular.module('Pension')
		.factory('dataFactory', ['$http', function($http) {


				var urlBase = 'http://107.170.53.98/pension-fund/api/web/app.php';
				var dataFactory = {};

				dataFactory.getFundDetails = function(fund) {
					return $http.get(urlBase + '/fund/details', {
						params: {fund: fund}
					});
				};

				dataFactory.getFundSectors = function(fund) {
					return $http.get(urlBase + '/fund/sectors', {
						params: {fund: fund}
					});
				};

				dataFactory.getFundCountries = function(fund) {
					return $http.get(urlBase + '/fund/countries', {
						params: {fund: fund}
					});
				};

				dataFactory.getFunds = function() {
					return $http.get(urlBase + '/fund/funds');
				};



				dataFactory.listCountries = function() {
					return $http.get(urlBase);
				};

				dataFactory.listSectors = function() {
					return $http.get(urlBase);
				};

				dataFactory.listFundTypes = function() {
					return $http.get(urlBase);
				};

				dataFactory.listFundcategories = function() {
					return $http.get(urlBase);
				};


				return dataFactory;
			}]);