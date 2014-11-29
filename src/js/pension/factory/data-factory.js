angular.module('Pension')
		.factory('dataFactory', ['$http', function($http) {


				var urlBase = 'http://107.170.53.98/pension-fund/api/web/app.php';
				var dataFactory = {};

				dataFactory.countries = function() {
					return $http.get(urlBase);
				};

				dataFactory.details = function() {
					return $http.get(urlBase);
				};
				
				dataFactory.getFunds = function() {
					return $http.get(urlBase + '/fund/funds');
				};

				dataFactory.sectors = function() {
					return $http.get(urlBase);
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