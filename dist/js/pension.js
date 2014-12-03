(function(){ 
angular.module('Pension', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngTable', 'ngAnimate', 'ui.slider']);
'use strict';

/**
 * Route configuration for the Dashboard module.
 */
angular.module('Pension').config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/');

    // Application routes
    $stateProvider
        .state('index', {
            url: '/',
            templateUrl: 'pension/tpls/index.html'
        })
        .state('list-funds', {
            url: '/list-funds',
            controller: 'ListFundsCtrl',
            templateUrl: 'pension/tpls/list-funds.html'
        })
         .state('view-fund', {
            url: '/view-fund/:fund',
            controller: 'ViewFundCtrl',
            templateUrl: 'pension/tpls/view-fund.html'
        })
        .state('tables', {
            url: '/tables', 
            templateUrl: 'tables.html'
        });
}]);

// I act a repository for the remote friend collection.
angular.module('Pension').service(
        "termService", ['$http', '$q',
    function($http, $q) {
        // var $url = "http://10.51.130.212/pension/web/app.php";
        var $url = "http://lai02.yellgroup.com";

        this.data = {
            searchPageMetrics: null,
            keywordInterpreterMetrics: null,
            synonymMetrics: null,
        };

        this.setSearchPageMetrics = function(searchPageMetrics) {
            this.data.searchPageMetrics = searchPageMetrics;
        };
        // Return public API.
        this.getSearchPageViewMetrics = function(term) {
            var request = $http({
                method: "get",
                url: $url + "/om5/term/count",
                params: {
                    term: term
                }
            });
            var self = this;
            return (request.then(handleSuccess, handleError)).then(
                    function(response) {
                        self.data.searchPageMetrics = response;
                        return response;
                        ;
                    });
        };

        this.getSynonymMetrics = function(term) {
            var request = $http({
                method: "get",
                url: $url + "/om5/term/synonym",
                params: {
                    term: term
                }
            });
            var self = this;
            return (request.then(handleSuccess, handleError)).then(
                    function(response) {
                        self.data.synonymMetrics = response;
                        return response;
                        ;
                    });
        };



        this.getKeywordInterpreterMetrics = function(keyword) {
            var request = $http({
                method: "get",
                url: $url + "/om5/term/keywordinterpreter",
                params: {
                    keyword: keyword
                }
            });
            var self = this;
            return (request.then(handleSuccess, handleError)).then(
                    function(response) {
                        self.data.keywordInterpreterMetrics = response;
                        return response;
                        ;
                    });
        };



        // ---
        // PUBLIC METHODS.
        // ---


        // I add a friend with the given name to the remote collection.
        function addFriend(name) {

            var request = $http({
                method: "post",
                url: "api/index.cfm",
                params: {
                    action: "add"
                },
                data: {
                    name: name
                }
            });

            return(request.then(handleSuccess, handleError));

        }


        // I get all of the friends in the remote collection.



        // I remove the friend with the given ID from the remote collection.
        function removeFriend(id) {

            var request = $http({
                method: "delete",
                url: "api/index.cfm",
                params: {
                    action: "delete"
                },
                data: {
                    id: id
                }
            });

            return(request.then(handleSuccess, handleError));

        }


        // ---
        // PRIVATE METHODS.
        // ---


        // I transform the error response, unwrapping the application dta from
        // the API response payload.
        function handleError(response) {

            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (
                    !angular.isObject(response.data) ||
                    !response.data.message
                    ) {

                return($q.reject("An unknown error occurred."));

            }

            // Otherwise, use expected error message.
            return($q.reject(response.data.message));

        }


        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess(response) {

            return(response.data);

        }

    }
]);
/**
 * Master Controller
 */
angular.module('Pension')
		.controller('MasterCtrl', ['$scope', '$cookieStore', MasterCtrl]);

function MasterCtrl($scope, $cookieStore) {
	/**
	 * Sidebar Toggle & Cookie Control
	 *
	 */

	// $scope.term = 'Hairdressers';

	var mobileView = 992;

	$scope.data = {};
	$scope.search = {};
	$scope.listCountries = [{"code": "AF", "iso3": "AFG", "countryname": "Afghanistan", "full_name": "Islamic Republic of Afghanistan", "country_number": "004", "continent_code": "AS"}, {"code": "AX", "iso3": "ALA", "countryname": "\u2248land Islands", "full_name": "\u2248land Islands", "country_number": "248", "continent_code": "EU"}, {"code": "AL", "iso3": "ALB", "countryname": "Albania", "full_name": "Republic of Albania", "country_number": "008", "continent_code": "EU"}, {"code": "DZ", "iso3": "DZA", "countryname": "Algeria", "full_name": "People`s Democratic Republic of Algeria", "country_number": "012", "continent_code": "AF"}, {"code": "AS", "iso3": "ASM", "countryname": "American Samoa", "full_name": "American Samoa", "country_number": "016", "continent_code": "OC"}, {"code": "AD", "iso3": "AND", "countryname": "Andorra", "full_name": "Principality of Andorra", "country_number": "020", "continent_code": "EU"}, {"code": "AO", "iso3": "AGO", "countryname": "Angola", "full_name": "Republic of Angola", "country_number": "024", "continent_code": "AF"}, {"code": "AI", "iso3": "AIA", "countryname": "Anguilla", "full_name": "Anguilla", "country_number": "660", "continent_code": "NA"}, {"code": "AQ", "iso3": "ATA", "countryname": "Antarctica", "full_name": "Antarctica (the territory South of 60 deg S)", "country_number": "010", "continent_code": "AN"}, {"code": "AG", "iso3": "ATG", "countryname": "Antigua and Barbuda", "full_name": "Antigua and Barbuda", "country_number": "028", "continent_code": "NA"}, {"code": "AR", "iso3": "ARG", "countryname": "Argentina", "full_name": "Argentine Republic", "country_number": "032", "continent_code": "SA"}, {"code": "AM", "iso3": "ARM", "countryname": "Armenia", "full_name": "Republic of Armenia", "country_number": "051", "continent_code": "AS"}, {"code": "AW", "iso3": "ABW", "countryname": "Aruba", "full_name": "Aruba", "country_number": "533", "continent_code": "NA"}, {"code": "AU", "iso3": "AUS", "countryname": "Australia", "full_name": "Commonwealth of Australia", "country_number": "036", "continent_code": "OC"}, {"code": "AT", "iso3": "AUT", "countryname": "Austria", "full_name": "Republic of Austria", "country_number": "040", "continent_code": "EU"}, {"code": "AZ", "iso3": "AZE", "countryname": "Azerbaijan", "full_name": "Republic of Azerbaijan", "country_number": "031", "continent_code": "AS"}, {"code": "BS", "iso3": "BHS", "countryname": "Bahamas", "full_name": "Commonwealth of the Bahamas", "country_number": "044", "continent_code": "NA"}, {"code": "BH", "iso3": "BHR", "countryname": "Bahrain", "full_name": "Kingdom of Bahrain", "country_number": "048", "continent_code": "AS"}, {"code": "BD", "iso3": "BGD", "countryname": "Bangladesh", "full_name": "People`s Republic of Bangladesh", "country_number": "050", "continent_code": "AS"}, {"code": "BB", "iso3": "BRB", "countryname": "Barbados", "full_name": "Barbados", "country_number": "052", "continent_code": "NA"}, {"code": "BY", "iso3": "BLR", "countryname": "Belarus", "full_name": "Republic of Belarus", "country_number": "112", "continent_code": "EU"}, {"code": "BE", "iso3": "BEL", "countryname": "Belgium", "full_name": "Kingdom of Belgium", "country_number": "056", "continent_code": "EU"}, {"code": "BZ", "iso3": "BLZ", "countryname": "Belize", "full_name": "Belize", "country_number": "084", "continent_code": "NA"}, {"code": "BJ", "iso3": "BEN", "countryname": "Benin", "full_name": "Republic of Benin", "country_number": "204", "continent_code": "AF"}, {"code": "BM", "iso3": "BMU", "countryname": "Bermuda", "full_name": "Bermuda", "country_number": "060", "continent_code": "NA"}, {"code": "BT", "iso3": "BTN", "countryname": "Bhutan", "full_name": "Kingdom of Bhutan", "country_number": "064", "continent_code": "AS"}, {"code": "BO", "iso3": "BOL", "countryname": "Bolivia", "full_name": "Plurinational State of Bolivia", "country_number": "068", "continent_code": "SA"}, {"code": "BQ", "iso3": "BES", "countryname": "Bonaire, Sint Eustatius and Saba", "full_name": "Bonaire, Sint Eustatius and Saba", "country_number": "535", "continent_code": "NA"}, {"code": "BA", "iso3": "BIH", "countryname": "Bosnia and Herzegovina", "full_name": "Bosnia and Herzegovina", "country_number": "070", "continent_code": "EU"}, {"code": "BW", "iso3": "BWA", "countryname": "Botswana", "full_name": "Republic of Botswana", "country_number": "072", "continent_code": "AF"}, {"code": "BV", "iso3": "BVT", "countryname": "Bouvet Island (Bouvetoya)", "full_name": "Bouvet Island (Bouvetoya)", "country_number": "074", "continent_code": "AN"}, {"code": "BR", "iso3": "BRA", "countryname": "Brazil", "full_name": "Federative Republic of Brazil", "country_number": "076", "continent_code": "SA"}, {"code": "IO", "iso3": "IOT", "countryname": "British Indian Ocean Territory (Chagos Archipelago)", "full_name": "British Indian Ocean Territory (Chagos Archipelago)", "country_number": "086", "continent_code": "AS"}, {"code": "VG", "iso3": "VGB", "countryname": "British Virgin Islands", "full_name": "British Virgin Islands", "country_number": "092", "continent_code": "NA"}, {"code": "BN", "iso3": "BRN", "countryname": "Brunei Darussalam", "full_name": "Brunei Darussalam", "country_number": "096", "continent_code": "AS"}, {"code": "BG", "iso3": "BGR", "countryname": "Bulgaria", "full_name": "Republic of Bulgaria", "country_number": "100", "continent_code": "EU"}, {"code": "BF", "iso3": "BFA", "countryname": "Burkina Faso", "full_name": "Burkina Faso", "country_number": "854", "continent_code": "AF"}, {"code": "BI", "iso3": "BDI", "countryname": "Burundi", "full_name": "Republic of Burundi", "country_number": "108", "continent_code": "AF"}, {"code": "KH", "iso3": "KHM", "countryname": "Cambodia", "full_name": "Kingdom of Cambodia", "country_number": "116", "continent_code": "AS"}, {"code": "CM", "iso3": "CMR", "countryname": "Cameroon", "full_name": "Republic of Cameroon", "country_number": "120", "continent_code": "AF"}, {"code": "CA", "iso3": "CAN", "countryname": "Canada", "full_name": "Canada", "country_number": "124", "continent_code": "NA"}, {"code": "CV", "iso3": "CPV", "countryname": "Cape Verde", "full_name": "Republic of Cape Verde", "country_number": "132", "continent_code": "AF"}, {"code": "KY", "iso3": "CYM", "countryname": "Cayman Islands", "full_name": "Cayman Islands", "country_number": "136", "continent_code": "NA"}, {"code": "CF", "iso3": "CAF", "countryname": "Central African Republic", "full_name": "Central African Republic", "country_number": "140", "continent_code": "AF"}, {"code": "TD", "iso3": "TCD", "countryname": "Chad", "full_name": "Republic of Chad", "country_number": "148", "continent_code": "AF"}, {"code": "CL", "iso3": "CHL", "countryname": "Chile", "full_name": "Republic of Chile", "country_number": "152", "continent_code": "SA"}, {"code": "CN", "iso3": "CHN", "countryname": "China", "full_name": "People`s Republic of China", "country_number": "156", "continent_code": "AS"}, {"code": "CX", "iso3": "CXR", "countryname": "Christmas Island", "full_name": "Christmas Island", "country_number": "162", "continent_code": "AS"}, {"code": "CC", "iso3": "CCK", "countryname": "Cocos (Keeling) Islands", "full_name": "Cocos (Keeling) Islands", "country_number": "166", "continent_code": "AS"}, {"code": "CO", "iso3": "COL", "countryname": "Colombia", "full_name": "Republic of Colombia", "country_number": "170", "continent_code": "SA"}, {"code": "KM", "iso3": "COM", "countryname": "Comoros", "full_name": "Union of the Comoros", "country_number": "174", "continent_code": "AF"}, {"code": "CD", "iso3": "COD", "countryname": "Congo", "full_name": "Democratic Republic of the Congo", "country_number": "180", "continent_code": "AF"}, {"code": "CG", "iso3": "COG", "countryname": "Congo", "full_name": "Republic of the Congo", "country_number": "178", "continent_code": "AF"}, {"code": "CK", "iso3": "COK", "countryname": "Cook Islands", "full_name": "Cook Islands", "country_number": "184", "continent_code": "OC"}, {"code": "CR", "iso3": "CRI", "countryname": "Costa Rica", "full_name": "Republic of Costa Rica", "country_number": "188", "continent_code": "NA"}, {"code": "CI", "iso3": "CIV", "countryname": "Cote d`Ivoire", "full_name": "Republic of Cote d`Ivoire", "country_number": "384", "continent_code": "AF"}, {"code": "HR", "iso3": "HRV", "countryname": "Croatia", "full_name": "Republic of Croatia", "country_number": "191", "continent_code": "EU"}, {"code": "CU", "iso3": "CUB", "countryname": "Cuba", "full_name": "Republic of Cuba", "country_number": "192", "continent_code": "NA"}, {"code": "CW", "iso3": "CUW", "countryname": "Cura\u00c1ao", "full_name": "Cura\u00c1ao", "country_number": "531", "continent_code": "NA"}, {"code": "CY", "iso3": "CYP", "countryname": "Cyprus", "full_name": "Republic of Cyprus", "country_number": "196", "continent_code": "AS"}, {"code": "CZ", "iso3": "CZE", "countryname": "Czech Republic", "full_name": "Czech Republic", "country_number": "203", "continent_code": "EU"}, {"code": "DK", "iso3": "DNK", "countryname": "Denmark", "full_name": "Kingdom of Denmark", "country_number": "208", "continent_code": "EU"}, {"code": "DJ", "iso3": "DJI", "countryname": "Djibouti", "full_name": "Republic of Djibouti", "country_number": "262", "continent_code": "AF"}, {"code": "DM", "iso3": "DMA", "countryname": "Dominica", "full_name": "Commonwealth of Dominica", "country_number": "212", "continent_code": "NA"}, {"code": "DO", "iso3": "DOM", "countryname": "Dominican Republic", "full_name": "Dominican Republic", "country_number": "214", "continent_code": "NA"}, {"code": "EC", "iso3": "ECU", "countryname": "Ecuador", "full_name": "Republic of Ecuador", "country_number": "218", "continent_code": "SA"}, {"code": "EG", "iso3": "EGY", "countryname": "Egypt", "full_name": "Arab Republic of Egypt", "country_number": "818", "continent_code": "AF"}, {"code": "SV", "iso3": "SLV", "countryname": "El Salvador", "full_name": "Republic of El Salvador", "country_number": "222", "continent_code": "NA"}, {"code": "GQ", "iso3": "GNQ", "countryname": "Equatorial Guinea", "full_name": "Republic of Equatorial Guinea", "country_number": "226", "continent_code": "AF"}, {"code": "ER", "iso3": "ERI", "countryname": "Eritrea", "full_name": "State of Eritrea", "country_number": "232", "continent_code": "AF"}, {"code": "EE", "iso3": "EST", "countryname": "Estonia", "full_name": "Republic of Estonia", "country_number": "233", "continent_code": "EU"}, {"code": "ET", "iso3": "ETH", "countryname": "Ethiopia", "full_name": "Federal Democratic Republic of Ethiopia", "country_number": "231", "continent_code": "AF"}, {"code": "FO", "iso3": "FRO", "countryname": "Faroe Islands", "full_name": "Faroe Islands", "country_number": "234", "continent_code": "EU"}, {"code": "FK", "iso3": "FLK", "countryname": "Falkland Islands (Malvinas)", "full_name": "Falkland Islands (Malvinas)", "country_number": "238", "continent_code": "SA"}, {"code": "FJ", "iso3": "FJI", "countryname": "Fiji", "full_name": "Republic of Fiji", "country_number": "242", "continent_code": "OC"}, {"code": "FI", "iso3": "FIN", "countryname": "Finland", "full_name": "Republic of Finland", "country_number": "246", "continent_code": "EU"}, {"code": "FR", "iso3": "FRA", "countryname": "France", "full_name": "French Republic", "country_number": "250", "continent_code": "EU"}, {"code": "GF", "iso3": "GUF", "countryname": "French Guiana", "full_name": "French Guiana", "country_number": "254", "continent_code": "SA"}, {"code": "PF", "iso3": "PYF", "countryname": "French Polynesia", "full_name": "French Polynesia", "country_number": "258", "continent_code": "OC"}, {"code": "TF", "iso3": "ATF", "countryname": "French Southern Territories", "full_name": "French Southern Territories", "country_number": "260", "continent_code": "AN"}, {"code": "GA", "iso3": "GAB", "countryname": "Gabon", "full_name": "Gabonese Republic", "country_number": "266", "continent_code": "AF"}, {"code": "GM", "iso3": "GMB", "countryname": "Gambia", "full_name": "Republic of the Gambia", "country_number": "270", "continent_code": "AF"}, {"code": "GE", "iso3": "GEO", "countryname": "Georgia", "full_name": "Georgia", "country_number": "268", "continent_code": "AS"}, {"code": "DE", "iso3": "DEU", "countryname": "Germany", "full_name": "Federal Republic of Germany", "country_number": "276", "continent_code": "EU"}, {"code": "GH", "iso3": "GHA", "countryname": "Ghana", "full_name": "Republic of Ghana", "country_number": "288", "continent_code": "AF"}, {"code": "GI", "iso3": "GIB", "countryname": "Gibraltar", "full_name": "Gibraltar", "country_number": "292", "continent_code": "EU"}, {"code": "GR", "iso3": "GRC", "countryname": "Greece", "full_name": "Hellenic Republic Greece", "country_number": "300", "continent_code": "EU"}, {"code": "GL", "iso3": "GRL", "countryname": "Greenland", "full_name": "Greenland", "country_number": "304", "continent_code": "NA"}, {"code": "GD", "iso3": "GRD", "countryname": "Grenada", "full_name": "Grenada", "country_number": "308", "continent_code": "NA"}, {"code": "GP", "iso3": "GLP", "countryname": "Guadeloupe", "full_name": "Guadeloupe", "country_number": "312", "continent_code": "NA"}, {"code": "GU", "iso3": "GUM", "countryname": "Guam", "full_name": "Guam", "country_number": "316", "continent_code": "OC"}, {"code": "GT", "iso3": "GTM", "countryname": "Guatemala", "full_name": "Republic of Guatemala", "country_number": "320", "continent_code": "NA"}, {"code": "GG", "iso3": "GGY", "countryname": "Guernsey", "full_name": "Bailiwick of Guernsey", "country_number": "831", "continent_code": "EU"}, {"code": "GN", "iso3": "GIN", "countryname": "Guinea", "full_name": "Republic of Guinea", "country_number": "324", "continent_code": "AF"}, {"code": "GW", "iso3": "GNB", "countryname": "Guinea-Bissau", "full_name": "Republic of Guinea-Bissau", "country_number": "624", "continent_code": "AF"}, {"code": "GY", "iso3": "GUY", "countryname": "Guyana", "full_name": "Co-operative Republic of Guyana", "country_number": "328", "continent_code": "SA"}, {"code": "HT", "iso3": "HTI", "countryname": "Haiti", "full_name": "Republic of Haiti", "country_number": "332", "continent_code": "NA"}, {"code": "HM", "iso3": "HMD", "countryname": "Heard Island and McDonald Islands", "full_name": "Heard Island and McDonald Islands", "country_number": "334", "continent_code": "AN"}, {"code": "VA", "iso3": "VAT", "countryname": "Holy See (Vatican City State)", "full_name": "Holy See (Vatican City State)", "country_number": "336", "continent_code": "EU"}, {"code": "HN", "iso3": "HND", "countryname": "Honduras", "full_name": "Republic of Honduras", "country_number": "340", "continent_code": "NA"}, {"code": "HK", "iso3": "HKG", "countryname": "Hong Kong", "full_name": "Hong Kong Special Administrative Region of China", "country_number": "344", "continent_code": "AS"}, {"code": "HU", "iso3": "HUN", "countryname": "Hungary", "full_name": "Hungary", "country_number": "348", "continent_code": "EU"}, {"code": "IS", "iso3": "ISL", "countryname": "Iceland", "full_name": "Republic of Iceland", "country_number": "352", "continent_code": "EU"}, {"code": "IN", "iso3": "IND", "countryname": "India", "full_name": "Republic of India", "country_number": "356", "continent_code": "AS"}, {"code": "ID", "iso3": "IDN", "countryname": "Indonesia", "full_name": "Republic of Indonesia", "country_number": "360", "continent_code": "AS"}, {"code": "IR", "iso3": "IRN", "countryname": "Iran", "full_name": "Islamic Republic of Iran", "country_number": "364", "continent_code": "AS"}, {"code": "IQ", "iso3": "IRQ", "countryname": "Iraq", "full_name": "Republic of Iraq", "country_number": "368", "continent_code": "AS"}, {"code": "IE", "iso3": "IRL", "countryname": "Ireland", "full_name": "Ireland", "country_number": "372", "continent_code": "EU"}, {"code": "IM", "iso3": "IMN", "countryname": "Isle of Man", "full_name": "Isle of Man", "country_number": "833", "continent_code": "EU"}, {"code": "IL", "iso3": "ISR", "countryname": "Israel", "full_name": "State of Israel", "country_number": "376", "continent_code": "AS"}, {"code": "IT", "iso3": "ITA", "countryname": "Italy", "full_name": "Italian Republic", "country_number": "380", "continent_code": "EU"}, {"code": "JM", "iso3": "JAM", "countryname": "Jamaica", "full_name": "Jamaica", "country_number": "388", "continent_code": "NA"}, {"code": "JP", "iso3": "JPN", "countryname": "Japan", "full_name": "Japan", "country_number": "392", "continent_code": "AS"}, {"code": "JE", "iso3": "JEY", "countryname": "Jersey", "full_name": "Bailiwick of Jersey", "country_number": "832", "continent_code": "EU"}, {"code": "JO", "iso3": "JOR", "countryname": "Jordan", "full_name": "Hashemite Kingdom of Jordan", "country_number": "400", "continent_code": "AS"}, {"code": "KZ", "iso3": "KAZ", "countryname": "Kazakhstan", "full_name": "Republic of Kazakhstan", "country_number": "398", "continent_code": "AS"}, {"code": "KE", "iso3": "KEN", "countryname": "Kenya", "full_name": "Republic of Kenya", "country_number": "404", "continent_code": "AF"}, {"code": "KI", "iso3": "KIR", "countryname": "Kiribati", "full_name": "Republic of Kiribati", "country_number": "296", "continent_code": "OC"}, {"code": "KP", "iso3": "PRK", "countryname": "Korea", "full_name": "Democratic People`s Republic of Korea", "country_number": "408", "continent_code": "AS"}, {"code": "KR", "iso3": "KOR", "countryname": "Korea", "full_name": "Republic of Korea", "country_number": "410", "continent_code": "AS"}, {"code": "KW", "iso3": "KWT", "countryname": "Kuwait", "full_name": "State of Kuwait", "country_number": "414", "continent_code": "AS"}, {"code": "KG", "iso3": "KGZ", "countryname": "Kyrgyz Republic", "full_name": "Kyrgyz Republic", "country_number": "417", "continent_code": "AS"}, {"code": "LA", "iso3": "LAO", "countryname": "Lao People`s Democratic Republic", "full_name": "Lao People`s Democratic Republic", "country_number": "418", "continent_code": "AS"}, {"code": "LV", "iso3": "LVA", "countryname": "Latvia", "full_name": "Republic of Latvia", "country_number": "428", "continent_code": "EU"}, {"code": "LB", "iso3": "LBN", "countryname": "Lebanon", "full_name": "Lebanese Republic", "country_number": "422", "continent_code": "AS"}, {"code": "LS", "iso3": "LSO", "countryname": "Lesotho", "full_name": "Kingdom of Lesotho", "country_number": "426", "continent_code": "AF"}, {"code": "LR", "iso3": "LBR", "countryname": "Liberia", "full_name": "Republic of Liberia", "country_number": "430", "continent_code": "AF"}, {"code": "LY", "iso3": "LBY", "countryname": "Libya", "full_name": "Libya", "country_number": "434", "continent_code": "AF"}, {"code": "LI", "iso3": "LIE", "countryname": "Liechtenstein", "full_name": "Principality of Liechtenstein", "country_number": "438", "continent_code": "EU"}, {"code": "LT", "iso3": "LTU", "countryname": "Lithuania", "full_name": "Republic of Lithuania", "country_number": "440", "continent_code": "EU"}, {"code": "LU", "iso3": "LUX", "countryname": "Luxembourg", "full_name": "Grand Duchy of Luxembourg", "country_number": "442", "continent_code": "EU"}, {"code": "MO", "iso3": "MAC", "countryname": "Macao", "full_name": "Macao Special Administrative Region of China", "country_number": "446", "continent_code": "AS"}, {"code": "MK", "iso3": "MKD", "countryname": "Macedonia", "full_name": "Republic of Macedonia", "country_number": "807", "continent_code": "EU"}, {"code": "MG", "iso3": "MDG", "countryname": "Madagascar", "full_name": "Republic of Madagascar", "country_number": "450", "continent_code": "AF"}, {"code": "MW", "iso3": "MWI", "countryname": "Malawi", "full_name": "Republic of Malawi", "country_number": "454", "continent_code": "AF"}, {"code": "MY", "iso3": "MYS", "countryname": "Malaysia", "full_name": "Malaysia", "country_number": "458", "continent_code": "AS"}, {"code": "MV", "iso3": "MDV", "countryname": "Maldives", "full_name": "Republic of Maldives", "country_number": "462", "continent_code": "AS"}, {"code": "ML", "iso3": "MLI", "countryname": "Mali", "full_name": "Republic of Mali", "country_number": "466", "continent_code": "AF"}, {"code": "MT", "iso3": "MLT", "countryname": "Malta", "full_name": "Republic of Malta", "country_number": "470", "continent_code": "EU"}, {"code": "MH", "iso3": "MHL", "countryname": "Marshall Islands", "full_name": "Republic of the Marshall Islands", "country_number": "584", "continent_code": "OC"}, {"code": "MQ", "iso3": "MTQ", "countryname": "Martinique", "full_name": "Martinique", "country_number": "474", "continent_code": "NA"}, {"code": "MR", "iso3": "MRT", "countryname": "Mauritania", "full_name": "Islamic Republic of Mauritania", "country_number": "478", "continent_code": "AF"}, {"code": "MU", "iso3": "MUS", "countryname": "Mauritius", "full_name": "Republic of Mauritius", "country_number": "480", "continent_code": "AF"}, {"code": "YT", "iso3": "MYT", "countryname": "Mayotte", "full_name": "Mayotte", "country_number": "175", "continent_code": "AF"}, {"code": "MX", "iso3": "MEX", "countryname": "Mexico", "full_name": "United Mexican States", "country_number": "484", "continent_code": "NA"}, {"code": "FM", "iso3": "FSM", "countryname": "Micronesia", "full_name": "Federated States of Micronesia", "country_number": "583", "continent_code": "OC"}, {"code": "MD", "iso3": "MDA", "countryname": "Moldova", "full_name": "Republic of Moldova", "country_number": "498", "continent_code": "EU"}, {"code": "MC", "iso3": "MCO", "countryname": "Monaco", "full_name": "Principality of Monaco", "country_number": "492", "continent_code": "EU"}, {"code": "MN", "iso3": "MNG", "countryname": "Mongolia", "full_name": "Mongolia", "country_number": "496", "continent_code": "AS"}, {"code": "ME", "iso3": "MNE", "countryname": "Montenegro", "full_name": "Montenegro", "country_number": "499", "continent_code": "EU"}, {"code": "MS", "iso3": "MSR", "countryname": "Montserrat", "full_name": "Montserrat", "country_number": "500", "continent_code": "NA"}, {"code": "MA", "iso3": "MAR", "countryname": "Morocco", "full_name": "Kingdom of Morocco", "country_number": "504", "continent_code": "AF"}, {"code": "MZ", "iso3": "MOZ", "countryname": "Mozambique", "full_name": "Republic of Mozambique", "country_number": "508", "continent_code": "AF"}, {"code": "MM", "iso3": "MMR", "countryname": "Myanmar", "full_name": "Republic of the Union of Myanmar", "country_number": "104", "continent_code": "AS"}, {"code": "NA", "iso3": "NAM", "countryname": "Namibia", "full_name": "Republic of Namibia", "country_number": "516", "continent_code": "AF"}, {"code": "NR", "iso3": "NRU", "countryname": "Nauru", "full_name": "Republic of Nauru", "country_number": "520", "continent_code": "OC"}, {"code": "NP", "iso3": "NPL", "countryname": "Nepal", "full_name": "Federal Democratic Republic of Nepal", "country_number": "524", "continent_code": "AS"}, {"code": "NL", "iso3": "NLD", "countryname": "Netherlands", "full_name": "Kingdom of the Netherlands", "country_number": "528", "continent_code": "EU"}, {"code": "NC", "iso3": "NCL", "countryname": "New Caledonia", "full_name": "New Caledonia", "country_number": "540", "continent_code": "OC"}, {"code": "NZ", "iso3": "NZL", "countryname": "New Zealand", "full_name": "New Zealand", "country_number": "554", "continent_code": "OC"}, {"code": "NI", "iso3": "NIC", "countryname": "Nicaragua", "full_name": "Republic of Nicaragua", "country_number": "558", "continent_code": "NA"}, {"code": "NE", "iso3": "NER", "countryname": "Niger", "full_name": "Republic of Niger", "country_number": "562", "continent_code": "AF"}, {"code": "NG", "iso3": "NGA", "countryname": "Nigeria", "full_name": "Federal Republic of Nigeria", "country_number": "566", "continent_code": "AF"}, {"code": "NU", "iso3": "NIU", "countryname": "Niue", "full_name": "Niue", "country_number": "570", "continent_code": "OC"}, {"code": "NF", "iso3": "NFK", "countryname": "Norfolk Island", "full_name": "Norfolk Island", "country_number": "574", "continent_code": "OC"}, {"code": "MP", "iso3": "MNP", "countryname": "Northern Mariana Islands", "full_name": "Commonwealth of the Northern Mariana Islands", "country_number": "580", "continent_code": "OC"}, {"code": "NO", "iso3": "NOR", "countryname": "Norway", "full_name": "Kingdom of Norway", "country_number": "578", "continent_code": "EU"}, {"code": "OM", "iso3": "OMN", "countryname": "Oman", "full_name": "Sultanate of Oman", "country_number": "512", "continent_code": "AS"}, {"code": "PK", "iso3": "PAK", "countryname": "Pakistan", "full_name": "Islamic Republic of Pakistan", "country_number": "586", "continent_code": "AS"}, {"code": "PW", "iso3": "PLW", "countryname": "Palau", "full_name": "Republic of Palau", "country_number": "585", "continent_code": "OC"}, {"code": "PS", "iso3": "PSE", "countryname": "Palestinian Territory", "full_name": "Occupied Palestinian Territory", "country_number": "275", "continent_code": "AS"}, {"code": "PA", "iso3": "PAN", "countryname": "Panama", "full_name": "Republic of Panama", "country_number": "591", "continent_code": "NA"}, {"code": "PG", "iso3": "PNG", "countryname": "Papua New Guinea", "full_name": "Independent State of Papua New Guinea", "country_number": "598", "continent_code": "OC"}, {"code": "PY", "iso3": "PRY", "countryname": "Paraguay", "full_name": "Republic of Paraguay", "country_number": "600", "continent_code": "SA"}, {"code": "PE", "iso3": "PER", "countryname": "Peru", "full_name": "Republic of Peru", "country_number": "604", "continent_code": "SA"}, {"code": "PH", "iso3": "PHL", "countryname": "Philippines", "full_name": "Republic of the Philippines", "country_number": "608", "continent_code": "AS"}, {"code": "PN", "iso3": "PCN", "countryname": "Pitcairn Islands", "full_name": "Pitcairn Islands", "country_number": "612", "continent_code": "OC"}, {"code": "PL", "iso3": "POL", "countryname": "Poland", "full_name": "Republic of Poland", "country_number": "616", "continent_code": "EU"}, {"code": "PT", "iso3": "PRT", "countryname": "Portugal", "full_name": "Portuguese Republic", "country_number": "620", "continent_code": "EU"}, {"code": "PR", "iso3": "PRI", "countryname": "Puerto Rico", "full_name": "Commonwealth of Puerto Rico", "country_number": "630", "continent_code": "NA"}, {"code": "QA", "iso3": "QAT", "countryname": "Qatar", "full_name": "State of Qatar", "country_number": "634", "continent_code": "AS"}, {"code": "RE", "iso3": "REU", "countryname": "R\u00c8union", "full_name": "R\u00c8union", "country_number": "638", "continent_code": "AF"}, {"code": "RO", "iso3": "ROU", "countryname": "Romania", "full_name": "Romania", "country_number": "642", "continent_code": "EU"}, {"code": "RU", "iso3": "RUS", "countryname": "Russian Federation", "full_name": "Russian Federation", "country_number": "643", "continent_code": "EU"}, {"code": "RW", "iso3": "RWA", "countryname": "Rwanda", "full_name": "Republic of Rwanda", "country_number": "646", "continent_code": "AF"}, {"code": "BL", "iso3": "BLM", "countryname": "Saint Barth\u00c8lemy", "full_name": "Saint Barth\u00c8lemy", "country_number": "652", "continent_code": "NA"}, {"code": "SH", "iso3": "SHN", "countryname": "Saint Helena, Ascension and Tristan da Cunha", "full_name": "Saint Helena, Ascension and Tristan da Cunha", "country_number": "654", "continent_code": "AF"}, {"code": "KN", "iso3": "KNA", "countryname": "Saint Kitts and Nevis", "full_name": "Federation of Saint Kitts and Nevis", "country_number": "659", "continent_code": "NA"}, {"code": "LC", "iso3": "LCA", "countryname": "Saint Lucia", "full_name": "Saint Lucia", "country_number": "662", "continent_code": "NA"}, {"code": "MF", "iso3": "MAF", "countryname": "Saint Martin", "full_name": "Saint Martin (French part)", "country_number": "663", "continent_code": "NA"}, {"code": "PM", "iso3": "SPM", "countryname": "Saint Pierre and Miquelon", "full_name": "Saint Pierre and Miquelon", "country_number": "666", "continent_code": "NA"}, {"code": "VC", "iso3": "VCT", "countryname": "Saint Vincent and the Grenadines", "full_name": "Saint Vincent and the Grenadines", "country_number": "670", "continent_code": "NA"}, {"code": "WS", "iso3": "WSM", "countryname": "Samoa", "full_name": "Independent State of Samoa", "country_number": "882", "continent_code": "OC"}, {"code": "SM", "iso3": "SMR", "countryname": "San Marino", "full_name": "Republic of San Marino", "country_number": "674", "continent_code": "EU"}, {"code": "ST", "iso3": "STP", "countryname": "Sao Tome and Principe", "full_name": "Democratic Republic of Sao Tome and Principe", "country_number": "678", "continent_code": "AF"}, {"code": "SA", "iso3": "SAU", "countryname": "Saudi Arabia", "full_name": "Kingdom of Saudi Arabia", "country_number": "682", "continent_code": "AS"}, {"code": "SN", "iso3": "SEN", "countryname": "Senegal", "full_name": "Republic of Senegal", "country_number": "686", "continent_code": "AF"}, {"code": "RS", "iso3": "SRB", "countryname": "Serbia", "full_name": "Republic of Serbia", "country_number": "688", "continent_code": "EU"}, {"code": "SC", "iso3": "SYC", "countryname": "Seychelles", "full_name": "Republic of Seychelles", "country_number": "690", "continent_code": "AF"}, {"code": "SL", "iso3": "SLE", "countryname": "Sierra Leone", "full_name": "Republic of Sierra Leone", "country_number": "694", "continent_code": "AF"}, {"code": "SG", "iso3": "SGP", "countryname": "Singapore", "full_name": "Republic of Singapore", "country_number": "702", "continent_code": "AS"}, {"code": "SX", "iso3": "SXM", "countryname": "Sint Maarten (Dutch part)", "full_name": "Sint Maarten (Dutch part)", "country_number": "534", "continent_code": "NA"}, {"code": "SK", "iso3": "SVK", "countryname": "Slovakia (Slovak Republic)", "full_name": "Slovakia (Slovak Republic)", "country_number": "703", "continent_code": "EU"}, {"code": "SI", "iso3": "SVN", "countryname": "Slovenia", "full_name": "Republic of Slovenia", "country_number": "705", "continent_code": "EU"}, {"code": "SB", "iso3": "SLB", "countryname": "Solomon Islands", "full_name": "Solomon Islands", "country_number": "090", "continent_code": "OC"}, {"code": "SO", "iso3": "SOM", "countryname": "Somalia", "full_name": "Somali Republic", "country_number": "706", "continent_code": "AF"}, {"code": "ZA", "iso3": "ZAF", "countryname": "South Africa", "full_name": "Republic of South Africa", "country_number": "710", "continent_code": "AF"}, {"code": "GS", "iso3": "SGS", "countryname": "South Georgia and the South Sandwich Islands", "full_name": "South Georgia and the South Sandwich Islands", "country_number": "239", "continent_code": "AN"}, {"code": "SS", "iso3": "SSD", "countryname": "South Sudan", "full_name": "Republic of South Sudan", "country_number": "728", "continent_code": "AF"}, {"code": "ES", "iso3": "ESP", "countryname": "Spain", "full_name": "Kingdom of Spain", "country_number": "724", "continent_code": "EU"}, {"code": "LK", "iso3": "LKA", "countryname": "Sri Lanka", "full_name": "Democratic Socialist Republic of Sri Lanka", "country_number": "144", "continent_code": "AS"}, {"code": "SD", "iso3": "SDN", "countryname": "Sudan", "full_name": "Republic of Sudan", "country_number": "729", "continent_code": "AF"}, {"code": "SR", "iso3": "SUR", "countryname": "Suriname", "full_name": "Republic of Suriname", "country_number": "740", "continent_code": "SA"}, {"code": "SJ", "iso3": "SJM", "countryname": "Svalbard \u0026 Jan Mayen Islands", "full_name": "Svalbard \u0026 Jan Mayen Islands", "country_number": "744", "continent_code": "EU"}, {"code": "SZ", "iso3": "SWZ", "countryname": "Swaziland", "full_name": "Kingdom of Swaziland", "country_number": "748", "continent_code": "AF"}, {"code": "SE", "iso3": "SWE", "countryname": "Sweden", "full_name": "Kingdom of Sweden", "country_number": "752", "continent_code": "EU"}, {"code": "CH", "iso3": "CHE", "countryname": "Switzerland", "full_name": "Swiss Confederation", "country_number": "756", "continent_code": "EU"}, {"code": "SY", "iso3": "SYR", "countryname": "Syrian Arab Republic", "full_name": "Syrian Arab Republic", "country_number": "760", "continent_code": "AS"}, {"code": "TW", "iso3": "TWN", "countryname": "Taiwan", "full_name": "Taiwan, Province of China", "country_number": "158", "continent_code": "AS"}, {"code": "TJ", "iso3": "TJK", "countryname": "Tajikistan", "full_name": "Republic of Tajikistan", "country_number": "762", "continent_code": "AS"}, {"code": "TZ", "iso3": "TZA", "countryname": "Tanzania", "full_name": "United Republic of Tanzania", "country_number": "834", "continent_code": "AF"}, {"code": "TH", "iso3": "THA", "countryname": "Thailand", "full_name": "Kingdom of Thailand", "country_number": "764", "continent_code": "AS"}, {"code": "TL", "iso3": "TLS", "countryname": "Timor-Leste", "full_name": "Democratic Republic of Timor-Leste", "country_number": "626", "continent_code": "AS"}, {"code": "TG", "iso3": "TGO", "countryname": "Togo", "full_name": "Togolese Republic", "country_number": "768", "continent_code": "AF"}, {"code": "TK", "iso3": "TKL", "countryname": "Tokelau", "full_name": "Tokelau", "country_number": "772", "continent_code": "OC"}, {"code": "TO", "iso3": "TON", "countryname": "Tonga", "full_name": "Kingdom of Tonga", "country_number": "776", "continent_code": "OC"}, {"code": "TT", "iso3": "TTO", "countryname": "Trinidad and Tobago", "full_name": "Republic of Trinidad and Tobago", "country_number": "780", "continent_code": "NA"}, {"code": "TN", "iso3": "TUN", "countryname": "Tunisia", "full_name": "Tunisian Republic", "country_number": "788", "continent_code": "AF"}, {"code": "TR", "iso3": "TUR", "countryname": "Turkey", "full_name": "Republic of Turkey", "country_number": "792", "continent_code": "AS"}, {"code": "TM", "iso3": "TKM", "countryname": "Turkmenistan", "full_name": "Turkmenistan", "country_number": "795", "continent_code": "AS"}, {"code": "TC", "iso3": "TCA", "countryname": "Turks and Caicos Islands", "full_name": "Turks and Caicos Islands", "country_number": "796", "continent_code": "NA"}, {"code": "TV", "iso3": "TUV", "countryname": "Tuvalu", "full_name": "Tuvalu", "country_number": "798", "continent_code": "OC"}, {"code": "UG", "iso3": "UGA", "countryname": "Uganda", "full_name": "Republic of Uganda", "country_number": "800", "continent_code": "AF"}, {"code": "UA", "iso3": "UKR", "countryname": "Ukraine", "full_name": "Ukraine", "country_number": "804", "continent_code": "EU"}, {"code": "AE", "iso3": "ARE", "countryname": "United Arab Emirates", "full_name": "United Arab Emirates", "country_number": "784", "continent_code": "AS"}, {"code": "GB", "iso3": "GBR", "countryname": "United Kingdom of Great Britain \u0026 Northern Ireland", "full_name": "United Kingdom of Great Britain \u0026 Northern Ireland", "country_number": "826", "continent_code": "EU"}, {"code": "US", "iso3": "USA", "countryname": "United States of America", "full_name": "United States of America", "country_number": "840", "continent_code": "NA"}, {"code": "UM", "iso3": "UMI", "countryname": "United States Minor Outlying Islands", "full_name": "United States Minor Outlying Islands", "country_number": "581", "continent_code": "OC"}, {"code": "VI", "iso3": "VIR", "countryname": "United States Virgin Islands", "full_name": "United States Virgin Islands", "country_number": "850", "continent_code": "NA"}, {"code": "UY", "iso3": "URY", "countryname": "Uruguay", "full_name": "Eastern Republic of Uruguay", "country_number": "858", "continent_code": "SA"}, {"code": "UZ", "iso3": "UZB", "countryname": "Uzbekistan", "full_name": "Republic of Uzbekistan", "country_number": "860", "continent_code": "AS"}, {"code": "VU", "iso3": "VUT", "countryname": "Vanuatu", "full_name": "Republic of Vanuatu", "country_number": "548", "continent_code": "OC"}, {"code": "VE", "iso3": "VEN", "countryname": "Venezuela", "full_name": "Bolivarian Republic of Venezuela", "country_number": "862", "continent_code": "SA"}, {"code": "VN", "iso3": "VNM", "countryname": "Vietnam", "full_name": "Socialist Republic of Vietnam", "country_number": "704", "continent_code": "AS"}, {"code": "WF", "iso3": "WLF", "countryname": "Wallis and Futuna", "full_name": "Wallis and Futuna", "country_number": "876", "continent_code": "OC"}, {"code": "EH", "iso3": "ESH", "countryname": "Western Sahara", "full_name": "Western Sahara", "country_number": "732", "continent_code": "AF"}, {"code": "YE", "iso3": "YEM", "countryname": "Yemen", "full_name": "Yemen", "country_number": "887", "continent_code": "AS"}, {"code": "ZM", "iso3": "ZMB", "countryname": "Zambia", "full_name": "Republic of Zambia", "country_number": "894", "continent_code": "AF"}, {"code": "ZW", "iso3": "ZWE", "countryname": "Zimbabwe", "full_name": "Republic of Zimbabwe", "country_number": "716", "continent_code": "AF"}, {"code": "UK", "iso3": "GBR", "countryname": "United Kingdom of Great Britain \u0026 Northern Ireland", "full_name": "United Kingdom of Great Britain \u0026 Northern Ireland", "country_number": "826", "continent_code": "EU"}, {"code": "XS", "iso3": "   ", "countryname": "", "full_name": "", "country_number": "", "continent_code": ""}, {"code": "EU", "iso3": "   ", "countryname": "", "full_name": "", "country_number": "", "continent_code": "EU"}];
	$scope.listSectors = [{"sector": "Utilities"}, {"sector": "Consumer Services"}, {"sector": "Industrials"}, {"sector": "Basic Materials"}, {"sector": "Financials"}, {"sector": "Oil \u0026 Gas"}, {"sector": "Telecommunications"}, {"sector": "Consumer Goods"}, {"sector": "Health Care"}, {"sector": "Technology"}];
	$scope.listFundCategories = [{"category": "Biotechnology"}, {"category": "New markets"}, {"category": "Pension of less than 10 years"}, {"category": "Sweden Short"}, {"category": "Other industries"}, {"category": "Europe \/ Euroland Index"}, {"category": "Japan"}, {"category": "Sweden real interest"}, {"category": "North America and U.S. small caps"}, {"category": "Pharmaceuticals"}, {"category": "Pension of less than 20 years"}, {"category": "Russia"}, {"category": "Other countries"}, {"category": "Europe \/ Euroland Small Cap"}, {"category": "China"}, {"category": "Sv.aktier + + utl.aktier sv.r\u2030ntor"}, {"category": "Asia and the Far East"}, {"category": "Sweden small caps"}, {"category": "IT and communications"}, {"category": "Foreign equities and interest rates"}, {"category": "Sv.aktier + utl.aktier"}, {"category": "Other foreign"}, {"category": "Sweden"}, {"category": "Global"}, {"category": "Eastern Europe"}, {"category": "Europe and Euroland"}, {"category": "North America and the United States"}, {"category": "Latin America"}, {"category": "Europe"}, {"category": "Nordic"}, {"category": "Sweden Index"}, {"category": "Sweden long"}, {"category": "Board for more than 20 years"}, {"category": "Euroland"}, {"category": "Swedish equities and interest rates"}];
	$scope.listFundTypes = [{"type": "Balanced Funds"}, {"type": "Fixed Income Funds"}, {"type": "Generation funds"}, {"type": "Equity funds"}];

	$scope.search.selectedCountry = {};
	$scope.search.selectedSector = {};
	$scope.search.selectedCategory = {};
	$scope.search.selectedFundType = {};
	
	$scope.data.score = {
		min: 1,
		max: 50
	};



	$scope.getWidth = function() {
		return window.innerWidth;
	};

	$scope.$watch($scope.getWidth, function(newValue, oldValue)
	{
		if (newValue >= mobileView)
		{
			if (angular.isDefined($cookieStore.get('toggle')))
			{
				if ($cookieStore.get('toggle') == false)
				{
					$scope.toggle = false;
				}
				else
				{
					$scope.toggle = true;
				}
			}
			else
			{
				$scope.toggle = true;
			}
		}
		else
		{
			$scope.toggle = false;
		}

	});

	$scope.toggleSidebar = function()
	{
		$scope.toggle = !$scope.toggle;

		$cookieStore.put('toggle', $scope.toggle);
	};

	window.onresize = function() {
		$scope.$apply();
	};
}

angular.module('Pension').controller('TabMetricCtrl', ['$scope', 'termService', function($scope, termService) {
    $scope.data = termService.data;
    $scope.$watch(function() {
        return termService.data;
    }, function(newValue) {
        $scope.data = termService.data;
    });

    
    $scope.tabs = [
        {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
        {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true}
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            alert('You\'ve selected the alert tab!');
        });
    };
}]);
/**
 * Alerts Controller
 */
angular.module('Pension').controller('AlertsCtrl', ['$scope', AlertsCtrl]);

function AlertsCtrl($scope) {
    $scope.alerts = [
        { type: 'success', msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!' },
        { type: 'danger', msg: 'Found a bug? Create an issue with as many details as you can.' }
    ];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
}
angular.module('Pension').controller("ChartLineCtrl", ['$scope', '$timeout', function($scope, $timeout) {

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40],
            [28, 48, 40, 19, 86, 27, 90]
        ];
        $scope.onClick = function(points, evt) {
            console.log(points, evt);
        };

        // Simulate async data update
        $timeout(function() {
            $scope.data = [
                [28, 48, 40, 19, 86, 27, 90],
                [65, 59, 80, 81, 56, 55, 40]
            ];
        }, 3000);
    }]);

// console.log(Chart.defaults.global.colours);
/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 */
angular.module('Pension').directive('rdLoading', rdLoading);

function rdLoading () {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
};
/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 */
angular.module('Pension').directive('tabMetric', tabMetric);

function tabMetric() {
    var directive = {
        restrict: 'AE',
        templateUrl: 'pension/tpls/tab-metric.html'
    };
    return directive;
}
;
angular.module('Pension').controller('TermSearchCtrl', ['$scope', '$http', '$cookieStore', 'termService', function($scope, $http, $cookieStore, termService) {
        if(!$cookieStore.get('term-search')) {
            $cookieStore.put('term-search', 'Hairdressers');
        }
        $scope.data = {term: $cookieStore.get('term-search')};
        load($scope.data.term);
        $scope.load = load;
        
        function load(term) {
             $cookieStore.put('term-search', term);
             termService.getSearchPageViewMetrics(term);
             termService.getKeywordInterpreterMetrics(term);
             termService.getSynonymMetrics(term);
             
        }
    }]);
angular.module('Pension').controller('ListFundsCtrl', ['$scope', '$filter', 'ngTableParams', 'dataFactory', function($scope, $filter, ngTableParams, dataFactory) {
		/**   $http.get('phones/phones.json').success(function(data) {
		 $scope.phones = data;
		 });
		 
		 $scope.orderProp = 'age';**/

		$scope.funds = [{"fondnamn":"Aktiv Europa"},{"fondnamn":"Morgan Stanley Investment Funds Emerging Markets Debt Fund"},{"fondnamn":"Skandia Sm\u00c2bolag Sverige"},{"fondnamn":"Swedbank Robur Asienfonden"},{"fondnamn":"\u00f7hman F\u02c6retagsobligationsfond"},{"fondnamn":"SPP Aktiefond Sverige Aktiv"},{"fondnamn":"Carnegie - WorldWide Ethical"},{"fondnamn":"Credit Suisse Equity Fund (Lux) USA Value"},{"fondnamn":"Nordea Europafond"},{"fondnamn":"Handelsbanken R\u00c2varufond"},{"fondnamn":"Alfred Berg Obligasjon"},{"fondnamn":"Catella Avkastningsfond"},{"fondnamn":"Fidelity Funds - Em Europe, Middle East and Africa Fund"},{"fondnamn":"Holberg Rurik"},{"fondnamn":"UBS (Lux) Equity Sicav - Small Caps Europe"},{"fondnamn":"F\u0026C Portfolio Fund - US Smaller Companies A"},{"fondnamn":"L\u2030rarfond 45-58 \u00c2r"},{"fondnamn":"BL - Equities Dividend"},{"fondnamn":"UBS (Lux) Equity Fund - Global Innovators (EUR)"},{"fondnamn":"FIM China Placeringsfond"},{"fondnamn":"Monyx Strategi Balanserad"},{"fondnamn":"Spiltan Aktiefond Dalarna"},{"fondnamn":"SKAGEN Vekst"},{"fondnamn":"Taaleri Turkey Equity Fund"},{"fondnamn":"SEB Europafond"},{"fondnamn":"East Capital (Lux) China Fund"},{"fondnamn":"BlackRock Japan Fund"},{"fondnamn":"Handelsbanken Globalfond"},{"fondnamn":"Finasta Russia TOP20 Subfund"},{"fondnamn":"Amundi Funds Equity Euro Select"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Teknologifond"},{"fondnamn":"TURKISFUND EQUITIES"},{"fondnamn":"\u2248landsbanken Premium 70"},{"fondnamn":"Nordea Realr\u2030ntefond"},{"fondnamn":"JPM Investment Funds - Global Bond Fund (EUR)"},{"fondnamn":"Norron Sicav-Target"},{"fondnamn":"Seligson \u0026 Co Finland - Indexfond"},{"fondnamn":"Enter Penningmarknadsfond"},{"fondnamn":"FIM Brazil Placeringsfond"},{"fondnamn":"Morgan Stanley Investment Funds Global Property Fund"},{"fondnamn":"ING (L) Renta Fund Emerging Markets Debt Local Currency"},{"fondnamn":"Didner \u0026 Gerge Sm\u00c2bolag"},{"fondnamn":"SPP Aktiefond Europa"},{"fondnamn":"Independent Precious Metals Securities"},{"fondnamn":"Danske Invest Europa"},{"fondnamn":"Alfred Berg Aktiv"},{"fondnamn":"Fidelity Funds - Emerging Asia Fund"},{"fondnamn":"AXA Rosenberg Eurobloc Equity Alpha Fund"},{"fondnamn":"Spiltan Aktiefond Sverige"},{"fondnamn":"F\u0026C Portfolio Fund - European Small Cap A"},{"fondnamn":"L\u2030rarfond 21-44 \u00c2r"},{"fondnamn":"BL - Emerging Markets"},{"fondnamn":"Inside Australia"},{"fondnamn":"Baring Europa Fund"},{"fondnamn":"Monyx Strategi Trygghet"},{"fondnamn":"Morgan Stanley Investment Funds Eurozone Equity Alpha Fund"},{"fondnamn":"Basfonden"},{"fondnamn":"Taaleri Finland Value Equity Fund"},{"fondnamn":"SEB Sverigefond Stora Bolag"},{"fondnamn":"BlackRock Global Funds Japan Small \u0026 MidCap Opportunities Fund"},{"fondnamn":"Carnegie - Total"},{"fondnamn":"Finasta New Europe TOP20 Subfund"},{"fondnamn":"Amundi Funds Equity Emerging World"},{"fondnamn":"Amundi Funds Equity Asia ex Japan"},{"fondnamn":"Handelsbanken Funds Pension 40"},{"fondnamn":"\u2248landsbanken Finland Value"},{"fondnamn":"Nordea Nya Tillv\u2030xtmarknader"},{"fondnamn":"Amundi Funds Equity ASEAN"},{"fondnamn":"Enter Sverige"},{"fondnamn":"Franklin India Fund"},{"fondnamn":"\u2248landsbanken - Nordic Growth"},{"fondnamn":"Navigera Balans"},{"fondnamn":"Pictet Global Emerging Debt"},{"fondnamn":"Morgan Stanley Investment Funds US Growth Fund"},{"fondnamn":"Alpcot Active  - Alpcot Active Greater Russia"},{"fondnamn":"Amundi Funds Equity Japan Value"},{"fondnamn":"Morgan Stanley Investment Funds Latin American Equity Fund"},{"fondnamn":"First State Global Opportunities Fund"},{"fondnamn":"Swedbank Robur Kapitalinvest"},{"fondnamn":"SPP Aktiefond Japan"},{"fondnamn":"Carnegie Obligationsfond"},{"fondnamn":"Nordea North America Fund"},{"fondnamn":"Aktia Capital"},{"fondnamn":"Alfred Berg Norge"},{"fondnamn":"SPP Global Topp 100"},{"fondnamn":"Carnegie Afrikafond"},{"fondnamn":"Catella Sverige Select"},{"fondnamn":"Cicero World 0 - 50"},{"fondnamn":"F\u0026C Portfolio Fund - European Equity A"},{"fondnamn":"KPA Etisk R\u2030ntefond"},{"fondnamn":"Pictet Water"},{"fondnamn":"DNB Realr\u2030ntefond"},{"fondnamn":"Inside UK"},{"fondnamn":"Baring Global Emerging Markets Fund"},{"fondnamn":"Monyx Aktiv R\u2030nta"},{"fondnamn":"Simplicity Balans"},{"fondnamn":"DNB Nordic Technology"},{"fondnamn":"Aberdeen Global - Japanese Smaller Companies Fund"},{"fondnamn":"SEB Teknologifond"},{"fondnamn":"BlackRock Global SmallCap Fund"},{"fondnamn":"Amundi Funds Equity US Relative Value"},{"fondnamn":"Amundi Funds Equity Greater China"},{"fondnamn":"Sparinvest - Ethical Global Value"},{"fondnamn":"GodFond Sverige \u0026 V\u2030rlden"},{"fondnamn":"Fondita 2000+ Placeringsfond"},{"fondnamn":"\u2248landsbanken Euro Bond"},{"fondnamn":"Nordea Swedish Stars"},{"fondnamn":"Handelsbankens Japanfond"},{"fondnamn":"JPM Investment Funds - Europe Bond Fund"},{"fondnamn":"Amundi Funds Equity Latin America"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Tillv\u2030xtmarknadsfond"},{"fondnamn":"IKC Global Brand"},{"fondnamn":"Swedbank Robur Japanfond"},{"fondnamn":"SPP Aktiefond Sverige"},{"fondnamn":"Carnegie Likviditetsfond"},{"fondnamn":"Nordea Generationsfond 80-tal"},{"fondnamn":"BL Fund Selection - Equities"},{"fondnamn":"Nordea Japan Fund"},{"fondnamn":"East Capital (Lux) China East Asia Fund"},{"fondnamn":"Alfred Berg Nordic Best Selection"},{"fondnamn":"FIM India Placeringsfond"},{"fondnamn":"Catella Reavinstfond"},{"fondnamn":"AXA Rosenberg Europe Ex-UK Equity Alpha Fund"},{"fondnamn":"F\u0026C Portfolio Fund - Stewardship International A"},{"fondnamn":"KPA Etisk Blandfond 2"},{"fondnamn":"DNB Fund - Navigator"},{"fondnamn":"Inside USA Small Cap"},{"fondnamn":"AMF Aktiefond Mix"},{"fondnamn":"SEB L\u2030kemedelsfond"},{"fondnamn":"BlackRock Emerging Markets Fund"},{"fondnamn":"PineBridge Global Emerging Markets Equity Fund"},{"fondnamn":"Amundi Funds Equity Global Luxury and Lifestyle"},{"fondnamn":"Amundi Funds Equity India"},{"fondnamn":"JP Morgan China A (dist) - USD"},{"fondnamn":"Sparinvest - Procedo"},{"fondnamn":"Baring Latin America Fund"},{"fondnamn":"Aktiva Fonder SICAV - Global Tillv\u2030xt"},{"fondnamn":"Fondita Nordic Small Cap Placeringsfond"},{"fondnamn":"\u2248landsbanken Europe Value"},{"fondnamn":"Solidar Sicav - Global Tillv\u2030xt"},{"fondnamn":"Carnegie - European Equity"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar L\u00c2ng R\u2030ntefond"},{"fondnamn":"DNB Fund - Scandinavia"},{"fondnamn":"Handelsbanken Funds Pension 80"},{"fondnamn":"PineBridge Greater China Equity Fund"},{"fondnamn":"SPP Aktiefond USA"},{"fondnamn":"Carnegie Rysslandsfond"},{"fondnamn":"Svensk Fondservice Maximal"},{"fondnamn":"SKAGEN Tellus"},{"fondnamn":"Aviva Investors - European Real Estate Securities Fund"},{"fondnamn":"Danske Invest Global Index"},{"fondnamn":"Nordea Sverigefond"},{"fondnamn":"HealthInvest Access Fund"},{"fondnamn":"F\u0026C Portfolio Fund - Asia Pacific Dynamic"},{"fondnamn":"Skandia Nordamerika Exponering"},{"fondnamn":"UBS (Lux) Bond Fund-Global (CHF) (EUR hedged) P - acc"},{"fondnamn":"KPA Etisk Blandfond 1"},{"fondnamn":"Pictet Biotech"},{"fondnamn":"Inside Canada"},{"fondnamn":"Baring Global Resources Fund"},{"fondnamn":"AMF R\u2030ntefond Mix"},{"fondnamn":"AMF Aktiefond  Sm\u00c2bolag"},{"fondnamn":"Sparinvest - Securus"},{"fondnamn":"Aktiva Fonder SICAV-Global Stabil"},{"fondnamn":"Spiltan Aktiefond Sm\u00c2land"},{"fondnamn":"Aktie-Ansvar Europa"},{"fondnamn":"Fondita Equity Spice Placeringsfond"},{"fondnamn":"JPM Investment Funds - Japan Select Equity Fund"},{"fondnamn":"Solidar Sicav - Global Fokus"},{"fondnamn":"Handelsbanken Funds Pension 70"},{"fondnamn":"ODIN Europa"},{"fondnamn":"Pictet EUR Bonds"},{"fondnamn":"Nordea Global"},{"fondnamn":"Holberg Global"},{"fondnamn":"PineBridge Japan New Horizon Equity Fund"},{"fondnamn":"Swedbank Robur Technology"},{"fondnamn":"Carnegie Emerging Markets"},{"fondnamn":"Svensk Fondservice Offensiv"},{"fondnamn":"Nordea Sm\u00c2bolagsfond Norden"},{"fondnamn":"Simplicity Nya Europa"},{"fondnamn":"Nordea Generationsfond 70-tal"},{"fondnamn":"ING (L) Renta Fund Euromix Bond"},{"fondnamn":"Aviva Investors - European Convergence Equity Fund"},{"fondnamn":"\u2248landsbanken Eco Performance"},{"fondnamn":"Aktiespararna Topp Sverige"},{"fondnamn":"Alfred Berg Global Quant"},{"fondnamn":"Didner \u0026 Gerge Aktiefond"},{"fondnamn":"Skandia Sverige Exponering"},{"fondnamn":"Gustavia Kazakstan och Centralasien"},{"fondnamn":"AXA Rosenberg Global Equity Alpha Fund"},{"fondnamn":"\u00f7hman Penningmarknadsfond"},{"fondnamn":"\u00f7hman Index Emerging Markets MSCI EM50"},{"fondnamn":"F\u0026C Portfolio Fund - Global Emerging Markets Portfolio A"},{"fondnamn":"KPA Etisk Aktiefond"},{"fondnamn":"Pictet Digital Communication"},{"fondnamn":"Inside USA"},{"fondnamn":"Baring High Yield Bond Fund US$ (USD)"},{"fondnamn":"\u00f7hman Sicav 1 - \u00f7hman Fixed Income Allocation Fund G"},{"fondnamn":"Sparinvest - Global - Small Cap Value"},{"fondnamn":"BlackRock Japan Value Fund"},{"fondnamn":"BL - Equities America"},{"fondnamn":"SEB Aktiesparfond"},{"fondnamn":"BlackRock Global Allocation Fund"},{"fondnamn":"Amundi Funds Absolute Volatility World"},{"fondnamn":"Amundi Funds Equity Global Select"},{"fondnamn":"PineBridge American Equity Fund"},{"fondnamn":"Amundi Funds Equity Global Gold Mines"},{"fondnamn":"AMF R\u2030ntefond kort"},{"fondnamn":"JPM Funds - Emerging Markets Equity Fund"},{"fondnamn":"Sparinvest  - Equitas"},{"fondnamn":"Aktie-Ansvar Avkastningsfond"},{"fondnamn":"European Quality Fund SICAV - European Equity Fund"},{"fondnamn":"SKAGEN m2"},{"fondnamn":"Gustavia Energi och R\u00c2varor"},{"fondnamn":"Carnegie - Medical"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Fastighetsfond"},{"fondnamn":"Handelsbanken Funds Pension 50"},{"fondnamn":"\u00f7hman Index Nordamerika MSCI North America"},{"fondnamn":"ODIN Europa SMB"},{"fondnamn":"Pictet World Government Bonds"},{"fondnamn":"Morgan Stanley Investment Funds European Equity Alpha Fund"},{"fondnamn":"Morgan Stanley Investment Funds Emerging Markets Equity Fund"},{"fondnamn":"Holberg Norge"},{"fondnamn":"Swedbank Robur Amerikafond"},{"fondnamn":"Alfred Berg Fastighetsfond Norden"},{"fondnamn":"BL - Global Equities"},{"fondnamn":"Swedbank Robur Transfer 90"},{"fondnamn":"Svensk Fondservice Balanserad"},{"fondnamn":"ING (L) Renta Fund Emerging Markets Debt Hard Currency"},{"fondnamn":"BL Fund Selection - 50-100"},{"fondnamn":"FIM Fenno Placeringsfond"},{"fondnamn":"Alfred Berg R\u2030nteallokering Plus"},{"fondnamn":"Handelsbanken Europa Aggressiv"},{"fondnamn":"Sverige Aktiv"},{"fondnamn":"Sparinvest Emerging Markets Value"},{"fondnamn":"\u00f7hman Obligationsfond"},{"fondnamn":"SPP F\u02c6retagsobligationsfond"},{"fondnamn":"Skandia Penningmarknadsfond"},{"fondnamn":"Positiv Pension Aktiv Global"},{"fondnamn":"JPMorgan India D (acc) -USD"},{"fondnamn":"East Capital Turkietfonden"},{"fondnamn":"Baring Hong Kong China Fund"},{"fondnamn":"Sparinvest Investment Grade Value Bonds"},{"fondnamn":"Aberdeen Global - Asia Local Currency Short Duration Bond Fund"},{"fondnamn":"BL - Equities Europe"},{"fondnamn":"BlackRock World Gold Fund"},{"fondnamn":"Navigera Aktie"},{"fondnamn":"Spiltan Aktiefond Stabil"},{"fondnamn":"Amundi Funds Equity Global Alpha"},{"fondnamn":"Aktie-Ansvar Sverige"},{"fondnamn":"ESPA Stock Commodities"},{"fondnamn":"Handelsbanken F\u02c6retagsobligationsfond"},{"fondnamn":"Swedbank Robur Kinafond"},{"fondnamn":"Carnegie - Nordic Markets"},{"fondnamn":"Handelsbanken Funds Pension 60"},{"fondnamn":"Delphi Global"},{"fondnamn":"Pictet EUR Corporate Bonds"},{"fondnamn":"Morgan Stanley Investment Funds European Property Fund"},{"fondnamn":"Morgan Stanley Investment Funds Emerging Europe Middle East Afr"},{"fondnamn":"Handelsbanken Indienfond"},{"fondnamn":"Holberg Norden"},{"fondnamn":"Luxembourg Selection Fund - Prognosia Galaxy"},{"fondnamn":"Fondita European Small Cap Placeringsfond"},{"fondnamn":"Solidar Fonder Etisk Plus"},{"fondnamn":"Carnegie Strategifond"},{"fondnamn":"Inside Asia"},{"fondnamn":"Nordea Generationsfond 60-tal"},{"fondnamn":"Allianz US Equity Fund"},{"fondnamn":"FIM USA"},{"fondnamn":"Alfred Berg Penningmarknadsfond"},{"fondnamn":"DNB Fund - Asian Small Cap"},{"fondnamn":"UBS (Lux) Equity Fund - Biotech (USD)"},{"fondnamn":"Sparinvest Emerging Markets Corporate Value Bonds"},{"fondnamn":"AXA Rosenberg Japan Equity Alpha Fund"},{"fondnamn":"Cicero Emerging Markets"},{"fondnamn":"F\u0026C Portfolio Fund - Japanese Equity A"},{"fondnamn":"Aberdeen Global - European Equity Fund"},{"fondnamn":"Skandia Offensiv"},{"fondnamn":"Pictet Eastern Europe"},{"fondnamn":"JPM Latin America D"},{"fondnamn":"Baring International Bond Fund"},{"fondnamn":"Sparinvest - European Value"},{"fondnamn":"Alfred Berg Norge Etisk"},{"fondnamn":"DNB Fund - China Century"},{"fondnamn":"BlackRock World Healthscience Fund"},{"fondnamn":"Navigera Tillv\u2030xt"},{"fondnamn":"PineBridge Emerging Europe Equity Fund"},{"fondnamn":"SEB Japanfond"},{"fondnamn":"Franklin U.S. Opportunities Fund"},{"fondnamn":"UBS (Lux) Equity Sicav - European Opportunity Unconstrained"},{"fondnamn":"Swedbank Robur Privatiseringsfond"},{"fondnamn":"Cicero Avkastningsfond"},{"fondnamn":"Carnegie - WorldWide"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Asienfond"},{"fondnamn":"Carnegie - Swedish Equity Fund"},{"fondnamn":"Delphi Nordic"},{"fondnamn":"Morgan Stanley Investment Funds Asian Equity Fund"},{"fondnamn":"Handelsbanken Rysslandsfond"},{"fondnamn":"FIM Nordic Placeringsfond"},{"fondnamn":"Evli Corporate Bond"},{"fondnamn":"SPP Generation 40-tal"},{"fondnamn":"Luxembourg Selection Fund - Prognosia Supernova"},{"fondnamn":"Blackrock Global Funds China Fund"},{"fondnamn":"Solidar Fonder Aggressiv Plus"},{"fondnamn":"Carnegie Sverigefond"},{"fondnamn":"Allianz Thailand Equity"},{"fondnamn":"FIM Russia Placeringsfond"},{"fondnamn":"Folksams Globala Aktiefond"},{"fondnamn":"Handelsbankens IT-fond"},{"fondnamn":"Sparinvest Ethical Emerging Markets Value"},{"fondnamn":"ING (L) Invest Information Technology"},{"fondnamn":"AXA Rosenberg Pacific Ex-Japan Equity Alpha Fund"},{"fondnamn":"Skandia F\u02c6rsiktig"},{"fondnamn":"Pictet Emerging Markets"},{"fondnamn":"JPM Global Dynamic D"},{"fondnamn":"SPP Aktiefond Global"},{"fondnamn":"Aberdeen Global - American Equity Fund"},{"fondnamn":"BL - Global 75"},{"fondnamn":"Danske Invest Global Corporate Bonds"},{"fondnamn":"DNB Fund - BRIC"},{"fondnamn":"BlackRock World Financials Fund"},{"fondnamn":"SEB Obligationsfond Flexibel SEK"},{"fondnamn":"DNB Sweden Micro Cap"},{"fondnamn":"Seligson \u0026 Co Global Top 25 Pharmaceuticals"},{"fondnamn":"Simplicity Likviditet"},{"fondnamn":"Evli Sverige Sm\u00c2bolag"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Kort R\u2030ntefond"},{"fondnamn":"ESPA Bond Emerging Markets"},{"fondnamn":"Handelsbanken Kinafond"},{"fondnamn":"Evli Statsobligation"},{"fondnamn":"SPP Generation 50-tal"},{"fondnamn":"Solidar Fonder Flex 100 Plus"},{"fondnamn":"Nordea Generationsfond 50-tal"},{"fondnamn":"Allianz Little Dragons"},{"fondnamn":"Danske Invest Global Stockpicking"},{"fondnamn":"FIM Brands"},{"fondnamn":"Nordea Rysslandsfond"},{"fondnamn":"Folksams Framtidsfond"},{"fondnamn":"Handelsbanken Finlandsfond (Placeringsfonden HB Aktie)"},{"fondnamn":"UBS (Lux) Equity Fund - Eco Performance (CHF)"},{"fondnamn":"F\u0026C Portfolio Fund - Global Climate Opportunities A"},{"fondnamn":"Skandia Time Global"},{"fondnamn":"Pictet Small Cap Europe"},{"fondnamn":"East Capital \u00f7steuropafonden"},{"fondnamn":"SPP Penningsmarknadsfond"},{"fondnamn":"Seligson \u0026 Co Euroobligation"},{"fondnamn":"BL - Global 50"},{"fondnamn":"DNB Fund - Private Equity"},{"fondnamn":"BlackRock World Technology Fund"},{"fondnamn":"Naventi Defensiv"},{"fondnamn":"SEB \u00f7steuropafond"},{"fondnamn":"ODIN Sverige"},{"fondnamn":"Independent Aktiv Max"},{"fondnamn":"FIM Vision Placeringsfond"},{"fondnamn":"Gustavia Ny Teknik"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar USA Aktiv"},{"fondnamn":"ESPA Bond Corporate BB"},{"fondnamn":"SPP Emerging Markets SRI"},{"fondnamn":"SPP Generation 60-tal"},{"fondnamn":"Solidar Fonder Flex 70 Plus"},{"fondnamn":"Handelsbanken Sverige OMXSB Index"},{"fondnamn":"Nordea Generationsfond 40-tal"},{"fondnamn":"Allianz US High Yield"},{"fondnamn":"FIM Forte Placeringsfond"},{"fondnamn":"Nordea Indienfond"},{"fondnamn":"Skandia Realr\u2030ntefond"},{"fondnamn":"Folksams Aktiefond Asien"},{"fondnamn":"SEB Rysslandsfonden"},{"fondnamn":"AXA Rosenberg Pan-European Equity Alpha Fund"},{"fondnamn":"Skandia V\u2030rlden"},{"fondnamn":"Pictet European Equity Selection"},{"fondnamn":"Inside Sweden"},{"fondnamn":"Baring Asia Growth Fund"},{"fondnamn":"Lannebo Likviditetsfond"},{"fondnamn":"Aberdeen Global - Select Global Credit Bond Fund"},{"fondnamn":"Seligson \u0026 Co Global Top 25 Brands"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Europa Index"},{"fondnamn":"BL - Global 30"},{"fondnamn":"DNB Fund - India"},{"fondnamn":"BlackRock World Mining Fund"},{"fondnamn":"Naventi Aktie"},{"fondnamn":"Enter Trend R\u2030ntefond"},{"fondnamn":"PineBridge Global Bond Fund"},{"fondnamn":"SEB Nordenfond"},{"fondnamn":"Simplicity Norden"},{"fondnamn":"Northern Star - Limestone New Europe Socially Responsible Fund"},{"fondnamn":"Lannebo Sverige 130\/30"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Europa Aktiv"},{"fondnamn":"ESPA Bond Emerging Markets Corporate"},{"fondnamn":"Nordea Far East Fund"},{"fondnamn":"SEB Realr\u2030ntefond SEK (SEB Fund 3- SEB Index Linked Bond Fund)"},{"fondnamn":"SPP Generation 70-tal"},{"fondnamn":"Solidar Fonder Flex 40 Plus"},{"fondnamn":"SKAGEN Kon-Tiki"},{"fondnamn":"Nordea Generationsfond Senior"},{"fondnamn":"Allianz Global Metals and Mining"},{"fondnamn":"DNB Fund - Global SRI"},{"fondnamn":"Carnegie Indienfond"},{"fondnamn":"Folksams Aktiefond Japan"},{"fondnamn":"\u00f7hman Sicav 1 - \u00f7hman High Yield Fund"},{"fondnamn":"UBS (Lux) Equity Fund - Euro Stoxx 50 (EUR)"},{"fondnamn":"Skandia USA"},{"fondnamn":"Life High Yield Bonds"},{"fondnamn":"Sparinvest Ethical High Yield Value Bonds"},{"fondnamn":"Aberdeen Global - UK Equity Fund"},{"fondnamn":"Seligson \u0026 Co Europa Indexfond"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Sm\u00c2bolagsfond"},{"fondnamn":"BL - Global Bond"},{"fondnamn":"Trigon Russia Top Picks Fund"},{"fondnamn":"DNB Health Care"},{"fondnamn":"BlackRock World Energy Fund"},{"fondnamn":"AMF Aktiefond Nordamerika"},{"fondnamn":"SEB Globalfond Chans\/Risk"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Globalfond"},{"fondnamn":"ING (L) Invest Global Opportunities"},{"fondnamn":"Gustavia Sm\u00c2bolag"},{"fondnamn":"\u2248landsbanken - Swedish Growth"},{"fondnamn":"ING (L) Invest World"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Sverige Aktiv"},{"fondnamn":"ESPA Bond Danubia"},{"fondnamn":"ValueInvest LUX Global"},{"fondnamn":"Invesco Emerging Market Quantitative Equity Fund"},{"fondnamn":"Simplicity Afrika"},{"fondnamn":"Gustavia Balkan"},{"fondnamn":"SPP Obligationsfond"},{"fondnamn":"Carnegie Corporate Bond"},{"fondnamn":"SEB Generationsfond 80-tal - Lux ack"},{"fondnamn":"AMF Aktiefond Europa"},{"fondnamn":"Allianz Europe Small Cap Equity"},{"fondnamn":"Fondmarknaden Global Edge"},{"fondnamn":"Danske Invest Eastern Europe Convergence A"},{"fondnamn":"Didner \u0026 Gerge Global"},{"fondnamn":"LHV Persian Gulf Fund"},{"fondnamn":"Folksams F\u02c6rvaltningsfond"},{"fondnamn":"UBS (Lux) Equity Fund - Financial Services (EUR)"},{"fondnamn":"Aviva Investors - European Corporate Bond Fund"},{"fondnamn":"AP7 R\u2030ntefond"},{"fondnamn":"Skandia Balanserad"},{"fondnamn":"BlackRock Global Equity Fund"},{"fondnamn":"Evli High Yield"},{"fondnamn":"Life Emerging Market Bonds"},{"fondnamn":"Sparinvest Emerging Markets Corporate Value Bonds"},{"fondnamn":"Aberdeen Global - Select Sterling Financials Bond Fund "},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar USA Index"},{"fondnamn":"BL - Bond Dollar"},{"fondnamn":"Nordea Nordenfond"},{"fondnamn":"East Capital Baltikumfonden"},{"fondnamn":"DNB USA"},{"fondnamn":"BlackRock New Energy Fund"},{"fondnamn":"IKC World Wide"},{"fondnamn":"Alfred Berg Obligationsfond Plus"},{"fondnamn":"PineBridge Global Focus Equity Fund"},{"fondnamn":"SEB Europafond Sm\u00c2bolag"},{"fondnamn":"Cicero World Asset Selection"},{"fondnamn":"ING (L) Invest Global Real Estate"},{"fondnamn":"ODIN Norge"},{"fondnamn":"Franklin US Equity Fund"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Sverige och V\u2030rlden"},{"fondnamn":"Mobilis Aktiv"},{"fondnamn":"Gustavia Sverige"},{"fondnamn":"Evli Finland Select"},{"fondnamn":"\u00f7hman Etisk Index Europa"},{"fondnamn":"Delphi Europe"},{"fondnamn":"AMF R\u2030ntefond L\u00c2ng"},{"fondnamn":"Evli Likviditet"},{"fondnamn":"Nordea Selekta Europa"},{"fondnamn":"\u00f7hman Etisk Index Sverige"},{"fondnamn":"Folksams Obligationsfond"},{"fondnamn":"UBS (Lux) Equity Fund - Health Care (USD)"},{"fondnamn":"Aviva Investors - European Equity Fund"},{"fondnamn":"AP7 Aktiefond"},{"fondnamn":"Skandia Japan"},{"fondnamn":"Carnegie Sm\u00c2bolagsfond"},{"fondnamn":"Granit Sverige 130\/30"},{"fondnamn":"Monyx Svenska Aktier"},{"fondnamn":"East Capital (Lux) Eastern European Fund"},{"fondnamn":"DNB Fund - Far East"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Sverige Index"},{"fondnamn":"BL - Bond Euro"},{"fondnamn":"Nordea Latinamerikafonden"},{"fondnamn":"DNB \u00f7steuropa"},{"fondnamn":"Fondbytesprogrammet 0-50"},{"fondnamn":"Enter Maximal"},{"fondnamn":"ING (L) Invest Sustainable Equity"},{"fondnamn":"ODIN Norden"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Trygghetsfond"},{"fondnamn":"Simplicity Asien"},{"fondnamn":"ValueInvest LUX Japan"},{"fondnamn":"Systematiska Sverige"},{"fondnamn":"\u2248landsbanken SICAV - Money Market SEK"},{"fondnamn":"\u00f7hman Etisk Index Japan"},{"fondnamn":"AMF Balansfond"},{"fondnamn":"Evli Sverige Aktieindex"},{"fondnamn":"Skandia Norden"},{"fondnamn":"Nordea R\u2030ntefond"},{"fondnamn":"Danske Invest SRI Global"},{"fondnamn":"Folksams Penningmarknadsfond"},{"fondnamn":"UBS (Lux) Equity Fund - Global Multi Tech (USD)"},{"fondnamn":"Naventi Balanserad"},{"fondnamn":"AXA Rosenberg US Equity Alpha Fund"},{"fondnamn":"Nordnet R\u2030nteindex Sverige"},{"fondnamn":"Skandia Asien"},{"fondnamn":"Granit Kina 130\/30"},{"fondnamn":"Evli Short Corporate Bond"},{"fondnamn":"East Capital (Lux) Russian Fund"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Statsobligationsfond"},{"fondnamn":"DNB F\u02c6retagsobligationsfond"},{"fondnamn":"BlackRock Global Funds US Small \u0026 MidCap Opportunities Fund"},{"fondnamn":"IKC Sverige Flexibel"},{"fondnamn":"UBS (Lux) Equity Sicav - USA Growth B"},{"fondnamn":"Handelsbankens Europafond Index"},{"fondnamn":"ING (L) Invest Middle East \u0026 North Africa"},{"fondnamn":"Tundra Agri \u0026 Food"},{"fondnamn":"Evli Ruble Debt"},{"fondnamn":"ODIN Finland"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Pension 2040"},{"fondnamn":"SEB Asset Selection Lux Ack"},{"fondnamn":"CB Fund Save Earth Fund"},{"fondnamn":"Tundra QuAsia"},{"fondnamn":"Swedbank Robur Ethica Sverige Global"},{"fondnamn":"\u2248landsbanken SICAV - China"},{"fondnamn":"\u00f7hman Etisk Index Pacific"},{"fondnamn":"Handelsbankens L\u2030kemedelsfond"},{"fondnamn":"Invesco Emerging Market Corporate Bond Fund Euro"},{"fondnamn":"Trigon Emerging Agri Sector Fund"},{"fondnamn":"AMF Aktiefond V\u2030rlden"},{"fondnamn":"Evli Sverige Select"},{"fondnamn":"Alfred Berg Sverige Plus"},{"fondnamn":"BL - Global Flexible EUR"},{"fondnamn":"Nordea Obligationsfond"},{"fondnamn":"Gustavia Ryssland"},{"fondnamn":"Folksams Aktiefond USA"},{"fondnamn":"FBP Pension Variabel"},{"fondnamn":"AXA Rosenberg Japan Small Cap Alpha Fund"},{"fondnamn":"Nordnet Aktieindex Sverige"},{"fondnamn":"Nordea Kinafond"},{"fondnamn":"Skandia Europa Exponering"},{"fondnamn":"Granit Sm\u00c2bolag"},{"fondnamn":"Evli Finland Mix"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Global Index"},{"fondnamn":"Simplicity Kina"},{"fondnamn":"DNB FRN-Fond SEK"},{"fondnamn":"BlackRock Latin American Fund"},{"fondnamn":"Evli Corporate Bond SEK Hedged"},{"fondnamn":"Credit Suisse Equity Fund (Lux) European Property"},{"fondnamn":"Handelsbankens Flermarknadsfond"},{"fondnamn":"Avaron Emerging Europe Fund"},{"fondnamn":"ING (L) Invest Greater China"},{"fondnamn":"Franklin European Growth Fund"},{"fondnamn":"Swedbank Robur Realr\u2030ntefond"},{"fondnamn":"Evli Nordic"},{"fondnamn":"FIM BRIC+ Placeringsfond"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Pension 2035"},{"fondnamn":"Alfred Berg Ryssland"},{"fondnamn":"Granit Trend 100"},{"fondnamn":"Swedbank Robur R\u2030ntefond Pension"},{"fondnamn":"\u2248landsbanken SICAV - Catamaran"},{"fondnamn":"\u00f7hman Etisk Index USA"},{"fondnamn":"Handelsbankens Latinamerikafond"},{"fondnamn":"Swedbank Robur Obligationsfond MEGA"},{"fondnamn":"Invesco Pan European Structured Equity Fund"},{"fondnamn":"Trigon Emerging Financials Fund"},{"fondnamn":"AMF Aktiefond Sverige"},{"fondnamn":"Allianz Europe Equity Growth"},{"fondnamn":"Handelsbanken Funds - Swedish Bonds Shares"},{"fondnamn":"\u00f7hman Index Sverige"},{"fondnamn":"BL Fund Selection - Asia"},{"fondnamn":"Folksams Aktiefond Europa"},{"fondnamn":"UBS(Lux) Equity Fund- USA Multi Strategy (USD) P-acc"},{"fondnamn":"FBP Opportunities Flexible"},{"fondnamn":"Independent Kameleont"},{"fondnamn":"Pictet Generics"},{"fondnamn":"Skandia Sverige"},{"fondnamn":"Sparinvest High Yield Value Bonds SEK R"},{"fondnamn":"Pictet Global Megatrend Selection"},{"fondnamn":"Naventi Offensiv Tillv\u2030xt"},{"fondnamn":"DNB Sm\u00c2bolagsfond"},{"fondnamn":"Catella SICAV - Catella Nordic Tiger"},{"fondnamn":"Danske Invest Horisont Offensiv"},{"fondnamn":"BlackRock European Value Fund"},{"fondnamn":"MLCX Commodity Enhanced Beta fund"},{"fondnamn":"Evli High Yield SEK Hedged"},{"fondnamn":"Swedbank Robur Ethica Global MEGA"},{"fondnamn":"Evli New Republics"},{"fondnamn":"Tundra Pakistanfond"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Pension 2030"},{"fondnamn":"Amundi Funds Equity Europe Select"},{"fondnamn":"Granit Trend 50"},{"fondnamn":"Handelsbankens \u00f7steuropafond"},{"fondnamn":"Invesco Balanced Risk Allocation Fund"},{"fondnamn":"Trigon New Europe Growth Fund"},{"fondnamn":"Franklin Mutual Global Discovery Fund"},{"fondnamn":"Swedbank Robur Penningmarknadsfond"},{"fondnamn":"Allianz Euro High Yield Bond"},{"fondnamn":"Handelsbanken Funds - Swedish Short Term Asset Shares"},{"fondnamn":"Carnegie - Swedish Small Cap"},{"fondnamn":"Aberdeen Global - Select Emerging Markets Bond Fund"},{"fondnamn":"Folksams Aktiefond Sverige"},{"fondnamn":"UBS (Lux) Strategy Fund - Balanced (EUR)"},{"fondnamn":"Simplicity Indien"},{"fondnamn":"Fondita European Top Picks B"},{"fondnamn":"First State Global Listed Infrastructure Fund"},{"fondnamn":"Skandia Kapitalmarknadsfond"},{"fondnamn":"Naventi Offensiv"},{"fondnamn":"DNB Sverigefond"},{"fondnamn":"Danske Invest Horisont R\u2030nta"},{"fondnamn":"BlackRock European Fund"},{"fondnamn":"Verdipapirfondet Holberg Kreditt SEK"},{"fondnamn":"UBS (Lux) Str. Sicav - Rogers Int Commodity Index (EUR)"},{"fondnamn":"Avanza Zero - Fonden utan avgifter"},{"fondnamn":"DNB Fund - SEK Long Bond"},{"fondnamn":"Cicero SRI Sverige"},{"fondnamn":"Tundra Rysslandsfond"},{"fondnamn":"Alfred Berg Sm\u00c2bolagsfond"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Pension 2025"},{"fondnamn":"Swedbank Robur Transfer 80"},{"fondnamn":"Swedbank Robur Mixfond Pension"},{"fondnamn":"Salus Alpha Managed Futures"},{"fondnamn":"\u00f7hman Hj\u2030rt-Lungfond"},{"fondnamn":"Handelsbankens Nordiska Sm\u00c2bolagsfond"},{"fondnamn":"Swedbank Robur Rysslandsfond"},{"fondnamn":"Baring High Yield Bond Fund Euro Hedged (EUR)"},{"fondnamn":"Swedbank Robur Globalfond MEGA"},{"fondnamn":"Allianz China Equity"},{"fondnamn":"Pictet Timber"},{"fondnamn":"FIM Union Placeringsfond"},{"fondnamn":"Carnegie - Svensk Obligationsfond"},{"fondnamn":"Aberdeen Global - Japanese Equity Fund"},{"fondnamn":"Fidelity Funds - China Consumer Fund"},{"fondnamn":"Folksams Tj\u2030nstemannafond Obligation"},{"fondnamn":"Monyx Strategi Offensiv"},{"fondnamn":"Fidelity Funds - Latin America Fund"},{"fondnamn":"Evli Europa"},{"fondnamn":"Swedbank Robur Ny Teknik"},{"fondnamn":"Carnegie Fonder Portfolio - Carnegie Strategy Fund (A)"},{"fondnamn":"BlackRock India Fund"},{"fondnamn":"BlackRock US Basic Value Fund"},{"fondnamn":"UBS (Lux) Equity Sicav - Russia"},{"fondnamn":"DNB Fund - SEK Short Bond"},{"fondnamn":"Lannebo Vision"},{"fondnamn":"Finasta Baltic Fund"},{"fondnamn":"ING (L) Invest Europe Opportunities"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Pension 2020"},{"fondnamn":"UBS (Lux) Equity Fund - Central Europe (EUR)"},{"fondnamn":"Morgan Stanley Investment Funds Indian Equity Fund"},{"fondnamn":"Solidar Fonder Flex 40"},{"fondnamn":"Swedbank Robur Transfer 70"},{"fondnamn":"Swedbank Robur Aktiefond Pension"},{"fondnamn":"Fondita Nordic Micro Cap Placeringsfond"},{"fondnamn":"\u00f7hman IT-fond"},{"fondnamn":"\u00f7hman Realobligationsfond"},{"fondnamn":"Trigon New Europe Fund"},{"fondnamn":"Swedbank Robur Sverigefond MEGA"},{"fondnamn":"Allianz BRIC Equity"},{"fondnamn":"Carnegie - Swedish Large Cap"},{"fondnamn":"Aberdeen Global - Select High Yield Bond Fund"},{"fondnamn":"UBS (Lux) Strategy Fund - Growth (EUR)"},{"fondnamn":"Fidelity Funds - Asian Special Situations Fund"},{"fondnamn":"Folksams Tj\u2030nstemannafond V\u2030rlden"},{"fondnamn":"Natixis Europe Smaller Companies Fund"},{"fondnamn":"Fidelity Funds - Global Strategic Bond Fund"},{"fondnamn":"First State Global Property Securities Fund"},{"fondnamn":"BlackRock US Flexible Equity Fund"},{"fondnamn":"TurnPoint Global Allocation"},{"fondnamn":"UBS (Lux) Equity Sicav - Brazil"},{"fondnamn":"Lannebo Sverige"},{"fondnamn":"SEB Obligationsfond SEK"},{"fondnamn":"UBS (Lux) Equity Sicav - Emerging Markets Innovator"},{"fondnamn":"Credit Suisse Bond Fund (Lux) Inflation Linked (Euro)"},{"fondnamn":"ING (L) Invest Alternative Beta"},{"fondnamn":"Pictet European Sustainable Equities"},{"fondnamn":"Handelsbankens Nordenfond"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Pension 2015"},{"fondnamn":"HealthInvest Asia Fund"},{"fondnamn":"Morgan Stanley Investment Funds US Advantage Fund"},{"fondnamn":"Carnegie - Svensk kort r\u2030nte"},{"fondnamn":"UBS (Lux) Key Sel. SICAV 2 - Asian Equities 130\/30 (USD)"},{"fondnamn":"DNB Fund - Global Emerging Markets"},{"fondnamn":"Swedbank Robur Transfer 60"},{"fondnamn":"Swedbank Robur Nordenfond"},{"fondnamn":"Alfred Berg GAMBAK"},{"fondnamn":"SEB Latinamerikafond"},{"fondnamn":"AMF Aktiefond Asien Stilla Havet"},{"fondnamn":"Swedbank Robur \u00f7steuropafond"},{"fondnamn":"Allianz Brazil Equity"},{"fondnamn":"SEB Generationsfond 70-tal"},{"fondnamn":"Danske Invest Aktiv F\u02c6rm\u02c6genhetsf\u02c6rvaltning"},{"fondnamn":"Fidelity Funds - European High Yield Fund"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Pension 2045"},{"fondnamn":"Simplicity F\u02c6retagsobligationer"},{"fondnamn":"Danske Invest Sverige Fokus"},{"fondnamn":"Folksams Tj\u2030nstemannafond Sverige"},{"fondnamn":"East Capital Rysslandsfonden"},{"fondnamn":"Fidelity Funds - Global Real Asset Securities Fund"},{"fondnamn":"Invesco US Value Equity Fund"},{"fondnamn":"First State Asian Property Securities Fund"},{"fondnamn":"Morgan Stanley Investment Funds Euro Corporate Bond"},{"fondnamn":"Carnegie Kinafond"},{"fondnamn":"Catella Sverige Passiv"},{"fondnamn":"Handelsbanken Amerikafond"},{"fondnamn":"\u2248landsbanken SICAV - Swedish Bond"},{"fondnamn":"Lannebo Sm\u00c2bolag"},{"fondnamn":"SEB Penningmarknadsfond SEK"},{"fondnamn":"UBS (Lux) Equity Fund - Asian Consumption (USD)"},{"fondnamn":"TURKISFUND BONDS"},{"fondnamn":"SPP Generation 80-tal"},{"fondnamn":"Amundi Funds Equity US Growth"},{"fondnamn":"Aberdeen Global - Technology Equity Fund"},{"fondnamn":"ING (L) Invest Euro Equity"},{"fondnamn":"Taaleri Rhein Value Equity Fund"},{"fondnamn":"L\u2030nsf\u02c6rs\u2030kringar Pension 2010"},{"fondnamn":"Carnegie - East European"},{"fondnamn":"Solidar Fonder Flex 70"},{"fondnamn":"Swedbank Robur Ethica Sverige"},{"fondnamn":"Swedbank Robur Transfer 50"},{"fondnamn":"Cicero World Wide"},{"fondnamn":"Swedbank Robur Sm\u00c2bolagsfond Sverige"},{"fondnamn":"ING (L) Invest First Class Protection"},{"fondnamn":"\u00f7hman Nordisk Milj\u02c6fond"},{"fondnamn":"Swedbank Robur Sm\u00c2bolagsfond Norden"},{"fondnamn":"Tundra Frontier Opportunities Fund"},{"fondnamn":"Aberdeen Global - European Equity (Ex UK) Fund"},{"fondnamn":"Danske Invest Sverige Likviditet"},{"fondnamn":"Fidelity Funds - America Fund"},{"fondnamn":"Pictet Japanese Equity Selection"},{"fondnamn":"Folksam LO Obligation"},{"fondnamn":"SKAGEN Krona"},{"fondnamn":"Fidelity Funds - Global Opportunities Fund"},{"fondnamn":"Invesco Global Equity Income Fund"},{"fondnamn":"East Capital Balkanfonden"},{"fondnamn":"Baring Global Select Fund"},{"fondnamn":"F\u0026C Portfolio Fund - European High Yield Bond"},{"fondnamn":"Advisor V\u2030rlden"},{"fondnamn":"Morgan Stanley Investment Funds Emerging Markets Domestic Debt"},{"fondnamn":"Pictet Indian Equities"},{"fondnamn":"Tundra Nigeria and Sub-Sahara"},{"fondnamn":"Lannebo Mixfond"},{"fondnamn":"SEB V\u2030rldenfond"},{"fondnamn":"Sparinvest - Global Value"},{"fondnamn":"Pictet Greater China"},{"fondnamn":"Amundi Funds Equity US Concentrated Core"},{"fondnamn":"\u2248landsbanken Brig 6"},{"fondnamn":"Pictet Clean Energy"},{"fondnamn":"Carnegie - Safety 90 Sverige"},{"fondnamn":"Solidar Fonder Flex 100"},{"fondnamn":"UBS (Lux) Equity Fund - Mid Caps USA (USD)"},{"fondnamn":"Evli Ryssland"},{"fondnamn":"PineBridge Europe Small Cap Equity Fund"},{"fondnamn":"Danske Invest Horisont Aktie"},{"fondnamn":"Swedbank Robur Sm\u00c2bolagsfond Europa"},{"fondnamn":"First State Global Resources Fund"},{"fondnamn":"ING (L) Invest European Equity"},{"fondnamn":"Franklin Templeton Global Allocation Fund"},{"fondnamn":"Aberdeen Global - Select Euro High Yield Bond "},{"fondnamn":"SEB Generationsfond 60-tal"},{"fondnamn":"Danske Invest Sverige Obligationer"},{"fondnamn":"JPM Europe Dynamic Mega Cap D"},{"fondnamn":"Swedbank Robur Ethica Sverige MEGA"},{"fondnamn":"Folksam LO V\u2030stfonden"},{"fondnamn":"Fidelity Funds - Global High Yield Focus Fund"},{"fondnamn":"Invesco Japanese Value Equity  Fund"},{"fondnamn":"AMF Aktiefond Global"},{"fondnamn":"UBS (Lux) Equity Fund - Greater China (USD)"},{"fondnamn":"F\u0026C Portfolio Fund - Emerging Markets Bond"},{"fondnamn":"Pictet Japanese Equities Opportunities"},{"fondnamn":"JP Global Trend"},{"fondnamn":"Monyx Strategi V\u2030rlden"},{"fondnamn":"Carnegie - Gorilla"},{"fondnamn":"SEB Asienfond ex Japan"},{"fondnamn":"BlackRock Euro Markets Fund"},{"fondnamn":"Handelsbanken Sverigefond"},{"fondnamn":"Independent Fonddoktorn Plus"},{"fondnamn":"Sparinvest - High Yield Value Bonds"},{"fondnamn":"Pictet Asian Equities (Ex Japan)"},{"fondnamn":"Amundi Funds Equity Global Resources"},{"fondnamn":"Handelsbanken Funds - Far East Shares"},{"fondnamn":"Credit Suisse Equity Fund (Lux) Small and Mid Cap Europe"},{"fondnamn":"ING (L) Invest Japan"},{"fondnamn":"Pictet Premium Brands"},{"fondnamn":"Pictet Russian Equities"},{"fondnamn":"Optimus High Yield"},{"fondnamn":"Danske Invest Horisont Balanserad"},{"fondnamn":"Swedbank Robur Medica"},{"fondnamn":"\u00f7hman Sverigefond"},{"fondnamn":"Morgan Stanley Investment Funds European Curr High Yield Bond"},{"fondnamn":"Simplicity Global Corporate Bond"},{"fondnamn":"DNB Utlandsfond"},{"fondnamn":"Danske Invest Sverige\/Europa"},{"fondnamn":"JPM Global Natural Resources D"},{"fondnamn":"Swedbank Robur Exportfond"},{"fondnamn":"Folksam LO V\u2030rlden"},{"fondnamn":"Quest Mangement Sicav - Quest Cleantech Fund A"},{"fondnamn":"Fidelity Funds - European Dynamic Growth Fund"},{"fondnamn":"UBS (Lux) Equity Fund - Small \u0026 Mid Caps Japan (JPY)"},{"fondnamn":"F\u0026C Portfolio Fund - Global Convertible Bond A"},{"fondnamn":"S\u02c6derberg \u0026 Partners Trygghet 75 PM"},{"fondnamn":"Monyx Strategi Nya Marknader"},{"fondnamn":"Taaleri Eastern Europe Equity Fund"},{"fondnamn":"SEB Emerging Marketsfond"},{"fondnamn":"BlackRock European Small \u0026 MidCap Opportunities Fund"},{"fondnamn":"Handelsbanken Svenska Sm\u00c2bolagsfond"},{"fondnamn":"Amundi Funds Equity Europe Restructuring"},{"fondnamn":"\u2248landsbanken Euro High Yield"},{"fondnamn":"ING (L) Invest Latin America"},{"fondnamn":"Indecap fondguide 2"},{"fondnamn":"Independent Aktiv Mix"},{"fondnamn":"Danske Invest Horisont F\u02c6rsiktig"},{"fondnamn":"Swedbank Robur Europafond MEGA"},{"fondnamn":"\u00f7hman Varum\u2030rkesfond"},{"fondnamn":"Morgan Stanley Investment Funds Euro Strategic Bond Fund"},{"fondnamn":"Swedbank Robur Realinvest"},{"fondnamn":"Pictet Security"},{"fondnamn":"Spiltan R\u2030ntefond Sverige"},{"fondnamn":"SEB Generationsfond 50-tal"},{"fondnamn":"Danske Invest Sverige"},{"fondnamn":"Folksam LO Sverige"},{"fondnamn":"Fidelity Funds - Emerging Markets Fund"},{"fondnamn":"Holberg Kreditt"},{"fondnamn":"UBS (Lux) Equity Fund - Emerging Markets (USD)"},{"fondnamn":"L\u2030rarfond 59+"},{"fondnamn":"S\u02c6derberg \u0026 Partners Trygghet 80 PM"},{"fondnamn":"Baring Eastern Europe Fund"},{"fondnamn":"Monyx Strategi Sverige\/V\u2030rlden"},{"fondnamn":"SKAGEN Global"},{"fondnamn":"Taaleri Russia Equity Fund"},{"fondnamn":"BL- Equities Horizon"},{"fondnamn":"Swedbank Robur Etik Balanserad"},{"fondnamn":"SEB Nordamerikafond"},{"fondnamn":"BlackRock Emerging Europe Fund"},{"fondnamn":"Handelsbankens Tillv\u2030xtmarknadsfond"},{"fondnamn":"FIM Mondo Placeringsfond"},{"fondnamn":"Finasta Emerging Europe Bond Subfund"},{"fondnamn":"Amundi Funds Equity Emerging Europe"},{"fondnamn":"ING (L) Invest Asia ex Japan"},{"fondnamn":"Gustavia Global Tillv\u2030xt"},{"fondnamn":"Nordea Globala Tillv\u2030xtmarknader"},{"fondnamn":"JPM Investment Funds - Global Balanced Fund (EUR)"},{"fondnamn":"Indecap Fondguide 1"},{"fondnamn":"Seligson \u0026 Co Asien - Indexfond"},{"fondnamn":"JRS SICAV - JRS Global Asset Allocation - Aktiv Pension"},{"fondnamn":"FIM Emerging Europe Placeringsfond"},{"fondnamn":"Aviva Investors - Global Convertibles Fund"}];


		$scope.values = {
			min: 1,
			max: 50
		};
		
		$scope.data.totalFunds = 0;



		$scope.rate = 1;
		$scope.max = 5;
		$scope.isReadonly = false;

		$scope.hoveringOver = function(value) {
			$scope.overStar = value;
			$scope.percent = 100 * (value / $scope.max);
		};

		$scope.ratingStates = [
			{stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
			{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
			{stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
			{stateOn: 'glyphicon-heart'},
			{stateOff: 'glyphicon-off'}
		];

		var data;


		$scope.tableParams = new ngTableParams({
			page: 1, // show first page
			count: 10, // count per page
			sorting: {
				name: 'asc'     // initial sorting
			}
		}, {
			total: 0, // length of data
			getData: function($defer, params) {
				// use build-in angular filter
				dataFactory.getFunds()
						.success(function(data) {
							// console.log(data.length);
							// data = response;
							// update table params
							$scope.data.totalFunds = data.length;
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
/**
 * 
 * 
 */
angular.module('Pension').directive('termSearch', termSearch);

function termSearch($parse) {
    var directive = {
        restrict: 'AE',
        templateUrl: 'pension/tpls/term/term-search.html',
        scope: true,
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        link: function(scope, element, attrs) {
           
        }
    };
    return directive;
}
;

angular.module('Pension').controller('TermSearchPageViewCtrl', ['$scope', '$http', 'termService', function($scope, $http, termService) {
        // $scope.data = [{"key": "Searches", "values": [[1375311600000, 274227], [1377990000000, 251592], [1380582000000, 239916], [1383264000000, 225168], [1385856000000, 203817], [1388534400000, 247154], [1391212800000, 239294], [1393632000000, 247746], [1396306800000, 237578], [1398898800000, 240284], [1401577200000, 240969], [1404169200000, 0], [1406847600000, 0], [1409526000000, 0], [1412118000000, 0]]}, {"key": "Page Views", "bar": true, "values": [[1375311600000, 349814], [1377990000000, 323587], [1380582000000, 307883], [1383264000000, 291368], [1385856000000, 275744], [1388534400000, 309709], [1391212800000, 313789], [1393632000000, 321019], [1396306800000, 303999], [1398898800000, 309197], [1401577200000, 313146], [1404169200000, 0], [1406847600000, 0], [1409526000000, 0], [1412118000000, 0]]}];
        $scope.data = termService.data.searchPageMetrics;
        $scope.$watch(function() {
            return termService.data.searchPageMetrics;
        }, function(newValue) {
            $scope.data = termService.data.searchPageMetrics;
        });

    }]);
/**
 * 
 * 
 */
angular.module('Pension').directive('termSearchPageview', termSearchPageview);

function termSearchPageview($parse) {
    var directive = {
        restrict: 'AE',
        templateUrl: 'pension/tpls/term/term-search-pageview.html',
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData'},
        link: function(scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            // var selector = element[0];
            return true;
            var chart;
            //var color = d3.scale.linear().domain([0,1]).range(["#fed900","#39c"]);
            var color = ["#fed900", "#39c"];
            //var color = d3.scale.category10().range();
            // console.log(color);
            // alert(scope.data);
                nv.addGraph(function() {
                    chart = nv.models.linePlusBarChart()
                            .margin({top: 30, right: 60, bottom: 50, left: 70})
                            .x(function(d, i) {
                        return i
                    })
                            .y(function(d) {
                        return d[1]
                    })
                            .color(color);


                    chart.xAxis
                            .showMaxMin(true)
                            .tickFormat(function(d) {
                        var dx = scope.data[0].values[d] && scope.data[0].values[d][0] || 0;
                        return d3.time.format('%m/%Y')(new Date(dx))
                    });

                    chart.y1Axis
                            .tickFormat(d3.format(',f'));

                    chart.y2Axis
                            .tickFormat(function(d) {
                        return d3.format(',f')(d)
                    });

                    chart.bars.forceY([0]);
                    chart.lines.forceY([0])

                    draw();

                    nv.utils.windowResize(chart.update);
                });


            function draw() {
                d3.select(element[0])
                        .datum(scope.data)
                        .transition().duration(500).call(chart);
            }

            function transition() {
                d3.select(element[0])
                        .transition().duration(500).call(chart);
            }

            scope.$watch('data', function() {
                draw();
            });

            scope.getWidth = function() {
                return element[0].offsetWidth;
            };

            scope.$watch(function() {
                return element[0].offsetWidth;
            }, function(newValue, oldValue)
            {
               // alert(newValue);
               chart.update;
            });

        }
    };
    return directive;
}
;

function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }
    return out;
}
angular.module('Pension').controller('SearchSectionCtrl', ['$scope', function($scope) {
        $scope.scopes = [];
        $scope.floor = 1;
        $scope.ceiling = 10;
       $scope.precision = 1;
        $scope.step = 1; 
        $scope.buffer = 1; 
        $scope.stickiness = 3; 
        /** $scope.sliderWidth = '100%'; **/
        
        $scope.value = 5;
        $scope.values = {
            min: 1,
            max: 50
        };
        $scope.scale = function(value) {
            return Math.pow(value, 3);
        };
        $scope.inverseScale = function(value) {
            var sign = value == 0 ? 1 : (value / Math.abs(value));
            return sign * Math.pow(Math.abs(value), 1 / 3);
        };
        $scope.addScope = function() {
            $scope.scopes.push({
                values: {
                    low: 4,
                    high: 7
                },
                value: 5
            });
        };
        $scope.translate = function(value) {
            return '$' + value;
        };
        $scope.translateCombined = function(low, high) {
            return $scope.translate(low.toFixed($scope.precision)) + " *** " + $scope.translate(high.toFixed($scope.precision));
        };
        $scope.translateRange = function(low, high) {
            return $scope.translate((high - low).toFixed($scope.precision));
        };
        $scope.fireResizeEvent = function() {
            $scope.$broadcast('refreshSlider');
        };
        
        $scope.currencyFormatting = function(value) { return value.toString() + " $" }
    }]);
angular.module('Pension').directive('searchSection', searchSection);
function searchSection() {
    var directive = {
        restrict: 'AE',
        replace: true,
        templateUrl: 'pension/tpls/section/search-section.html'
    };
    return directive;
}
;
angular.module('Pension').directive('latestReviews', latestReviews);
function latestReviews() {
    var directive = {
        restrict: 'AE',
        replace: true,
        templateUrl: 'pension/tpls/section/latest-reviews.html'
    };
    return directive;
}
;
angular.module('Pension').directive('sectorThumbnails', sectorThumbnails);
function sectorThumbnails() {
    var directive = {
        restrict: 'AE',
        replace: true,
        templateUrl: 'pension/tpls/section/sector-thumbnails.html'
    };
    return directive;
}
;
/**
 * 
 * 
 */
angular.module('Pension').directive('worldMap', worldMap);

function worldMap($parse) {
    var directive = {
        restrict: 'AE',
        // templateUrl: 'pension/tpls/term/term-search-pageview.html',
        replace: true,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '=chartData'},
        link: function(scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            // var selector = element[0];
            var chart;
            //var color = d3.scale.linear().domain([0,1]).range(["#fed900","#39c"]);
            var color = ["#fed900", "#39c"];

            // console.log("log");
            // var $container = "container";
            var $element = element[0];
            var $topoUrl = "./data/world-topo-min.json";
            var $dataUrl = "./data/country-capitals.csv";

            d3.select(window).on("resize", throttle);

            var zoom = d3.behavior.zoom()
                    .scaleExtent([1, 9])
                    .on("zoom", move);


            var width = $element.offsetWidth;
            var height = width / 2;
// var height = width / 4;

            var topo, projection, path, svg, g;

            var graticule = d3.geo.graticule();

            var tooltip = d3.select($element).append("div").attr("class", "tooltip hidden");

            setup(width, height);

            function setup(width, height) {
                projection = d3.geo.mercator()
                        .translate([(width / 2), (height / 2)])
                        .scale(width / 2 / Math.PI);

                path = d3.geo.path().projection(projection);

                svg = d3.select($element).append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .call(zoom)
                        .on("click", click)
                        .append("g");

                g = svg.append("g");

            }

            d3.json($topoUrl, function(error, world) {

                var countries = topojson.feature(world, world.objects.countries).features;

                topo = countries;
                draw(topo);

            });


            function getColours(r, g, b) {
                var opc = 0.1;
                var colours = [];
                while (opc <= 1) {
                    colours.push("rgba(" + r + ", " + g + ", " + b + ", " + opc + ")");
                    opc += 0.1;
                }
                return colours;
            }

// var colours = getColours(41, 125, 185);
// var colours = getColours(52, 152, 219);
            var colours = getColours(243, 156, 18);
            var colours = getColours(243, 156, 18);


            var heatmapColour = d3.scale.linear()
                    .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
                    .range(colours);

            function draw(topo) {

                svg.append("path")
                        .datum(graticule)
                        .attr("class", "graticule")
                        .attr("d", path);


                g.append("path")
                        .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
                        .attr("class", "equator")
                        .attr("d", path);


                var country = g.selectAll(".country").data(topo);

                country.enter().insert("path")
                        .attr("class", "country")
                        .attr("d", path)
                        .attr("id", function(d, i) {
                    return d.id;
                })
                        .attr("title", function(d, i) {
                    return d.properties.name;
                })
                        .attr("country", function(d, i) {
                    return d.properties.name.toUpperCase();
                })
                        .style("fill", function(d, i) {
                    return '#ccc';
                });

                //offsets for tooltips
                var offsetL = $element.offsetLeft + 20;
                var offsetT = $element.offsetTop + 10;

                //tooltips
                country
                        .on("mousemove", function(d, i) {

                    var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });

                    tooltip.classed("hidden", false)
                            .attr("style", "left:" + (mouse[0] + offsetL) + "px;top:" + (mouse[1] + offsetT) + "px")
                            .html(d.properties.name);

                })
                        .on("mouseout", function(d, i) {
                    tooltip.classed("hidden", true);
                });



                //EXAMPLE: adding some capitals from external CSV file
                d3.csv($dataUrl, function(err, capitals) {

                    capitals.forEach(function(i) {
                        addpoint(i.CapitalLongitude, i.CapitalLatitude, i.CapitalName);
                        var percent = i.Percent;
                        var rgb = d3.rgb('#090');
                        //console.log(i.CountryName.toUpperCase());
                        d3.select("[country='" + i.CountryName.toUpperCase() + "']").style("fill", function(d) {
                            // console.log(rgb.toString());
                            return heatmapColour(percent);
                        });
                    });

                });

            }


            function redraw() {
                width = $element.offsetWidth;
                height = width / 2;
                d3.select('svg').remove();
                setup(width, height);
                draw(topo);
            }


            function move() {

                var t = d3.event.translate;
                var s = d3.event.scale;
                zscale = s;
                var h = height / 4;


                t[0] = Math.min(
                        (width / height) * (s - 1),
                        Math.max(width * (1 - s), t[0])
                        );

                t[1] = Math.min(
                        h * (s - 1) + h * s,
                        Math.max(height * (1 - s) - h * s, t[1])
                        );

                zoom.translate(t);
                g.attr("transform", "translate(" + t + ")scale(" + s + ")");

                //adjust the country hover stroke width based on zoom level
                d3.selectAll(".country").style("stroke-width", 1.5 / s);

            }



            var throttleTimer;
            function throttle() {
                window.clearTimeout(throttleTimer);
                throttleTimer = window.setTimeout(function() {
                    redraw();
                }, 200);
            }


//geo translation on mouse click in map
            function click() {
                var latlon = projection.invert(d3.mouse(this));
                console.log(latlon);
            }


//function to add points and text to the map (used in plotting capitals)
            function addpoint(lat, lon, text) {

                var gpoint = g.append("g").attr("class", "gpoint");
                var x = projection([lat, lon])[0];
                var y = projection([lat, lon])[1];

                gpoint.append("svg:circle")
                        .attr("cx", x)
                        .attr("cy", y)
                        .attr("class", "point")
                        .attr("r", 1.5);

                //conditional in case a point has no associated text
                if (text.length > 0) {

                    gpoint.append("text")
                            .attr("x", x + 2)
                            .attr("y", y + 2)
                            .attr("class", "text")
                            .text(text);
                }

            }

        }
    };
    return directive;
}
;

/**
 * 
 * 
 */
angular.module('Pension').directive('lineChart', lineChart);

function lineChart($parse) {
    var directive = {
        restrict: 'AE',
        // templateUrl: 'pension/tpls/term/term-search-pageview.html',
        replace: true,
        //our data source would be an array
        //passed thru chart-data attribute
       // scope: {data: '=chartData'},
        link: function(scope, element, attrs) {

            var chart;
            d3.json('./data/cumulativeLineData.json', function(data) {
                nv.addGraph(function() {
                    chart = nv.models.cumulativeLineChart()
                            .x(function(d) {
                        return d[0]
                    })
                            .y(function(d) {
                        return d[1] / 100
                    }) //adjusting, 100% is 1.00, not 100 as it is in the data
                            .color(d3.scale.category10().range())
                            .useInteractiveGuideline(true)
                            ;

                    chart.xAxis
                            .tickValues([1078030800000, 1122782400000, 1167541200000, 1251691200000])
                            .tickFormat(function(d) {
                        return d3.time.format('%x')(new Date(d))
                    });

                    chart.yAxis
                            .tickFormat(d3.format(',.1%'));

                    var svg = d3.select(element[0]).append('svg');
                    console.log(svg);
                            svg.datum(data)
                            .call(chart);

                    //TODO: Figure out a good way to do this automatically
                    nv.utils.windowResize(chart.update);

                    return chart;
                });
            });
        }
    };
    return directive;
}
;

/**
 * 
 * 
 */
angular.module('Pension').directive('fundSectorChart', fundSectorChart);

function fundSectorChart($parse) {
	var directive = {
		restrict: 'AE',
		// templateUrl: 'pension/tpls/term/term-search-pageview.html',
		replace: true,
		scope: {
			data: '='
		},
		//our data source would be an array
		//passed thru chart-data attribute
		// scope: {data: '=chartData'},
		link: function(scope, element, attrs) {

			var chart;

			var svg;
			nv.addGraph(function() {
				chart = nv.models.pieChart()
						.x(function(d) {
							return d.label
						})
						.y(function(d) {
							return d.value
						})
						// .color(d3.scale.category20b())
						.showLabels(true);

				svg = d3.select(element[0]).append('svg');
				svg
						.datum(scope.data)
						.transition().duration(1200)

						.call(chart);

				return chart;
			});

			scope.$watch('data', function(oldValue, newValue) {
				if (svg !== null) {

					svg
							.datum(scope.data)
							.transition().duration(1200)

							.call(chart);
				}
			});
		}
	};
	return directive;
}
;

/**
 * 
 * 
 */
angular.module('Pension').directive('fundCountryChart', fundCountryChart);

function fundCountryChart($parse) {
    var directive = {
        restrict: 'AE',
        // templateUrl: 'pension/tpls/term/term-search-pageview.html',
        replace: true,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {data: '='},
        link: function(scope, element, attrs) {
            //in D3, any selection[0] contains the group
            //selection[0][0] is the DOM node
            //but we won't need that this time
            // var selector = element[0];
            var chart;
            //var color = d3.scale.linear().domain([0,1]).range(["#fed900","#39c"]);
            var color = ["#fed900", "#39c"];

            // console.log("log");
            // var $container = "container";
            var $element = element[0];
            var $topoUrl = "./data/world-topo-min.json";
            var $dataUrl = "./data/country-capitals.csv";

            d3.select(window).on("resize", throttle);

            var zoom = d3.behavior.zoom()
                    .scaleExtent([1, 9])
                    .on("zoom", move);


            var width = $element.offsetWidth;
            var height = width / 2;
// var height = width / 4;

            var topo, projection, path, svg, g;

            var graticule = d3.geo.graticule();

            var tooltip = d3.select($element).append("div").attr("class", "tooltip hidden");

            setup(width, height);

            function setup(width, height) {
                projection = d3.geo.mercator()
                        .translate([(width / 2), (height / 2)])
                        .scale(width / 2 / Math.PI);

                path = d3.geo.path().projection(projection);

                svg = d3.select($element).append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .call(zoom)
                        .on("click", click)
                        .append("g");

                g = svg.append("g");

            }

            d3.json($topoUrl, function(error, world) {

                var countries = topojson.feature(world, world.objects.countries).features;

                topo = countries;
                draw(topo);

            });


            function getColours(r, g, b) {
                var opc = 0.1;
                var colours = [];
                while (opc <= 1) {
                    colours.push("rgba(" + r + ", " + g + ", " + b + ", " + opc + ")");
                    opc += 0.1;
                }
                return colours;
            }

// var colours = getColours(41, 125, 185);
// var colours = getColours(52, 152, 219);
            var colours = getColours(243, 156, 18);
            var colours = getColours(243, 156, 18);


            var heatmapColour = d3.scale.linear()
                    .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
                    .range(colours);

            function draw(topo) {

                svg.append("path")
                        .datum(graticule)
                        .attr("class", "graticule")
                        .attr("d", path);


                g.append("path")
                        .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
                        .attr("class", "equator")
                        .attr("d", path);


                var country = g.selectAll(".country").data(topo);

                country.enter().insert("path")
                        .attr("class", "country")
                        .attr("d", path)
                        .attr("id", function(d, i) {
                    return d.id;
                })
                        .attr("title", function(d, i) {
                    return d.properties.name;
                })
                        .attr("country", function(d, i) {
                    return d.properties.name.toUpperCase();
                })
                        .style("fill", function(d, i) {
                    return '#ccc';
                });

                //offsets for tooltips
                var offsetL = $element.offsetLeft + 20;
                var offsetT = $element.offsetTop + 10;

                //tooltips
                country
                        .on("mousemove", function(d, i) {

                    var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });

                    tooltip.classed("hidden", false)
                            .attr("style", "left:" + (mouse[0] + offsetL) + "px;top:" + (mouse[1] + offsetT) + "px")
                            .html(d.properties.name);

                })
                        .on("mouseout", function(d, i) {
                    tooltip.classed("hidden", true);
                });



                //EXAMPLE: adding some capitals from external CSV file
                d3.csv($dataUrl, function(err, capitals) {

                    capitals.forEach(function(i) {
                        addpoint(i.CapitalLongitude, i.CapitalLatitude, i.CapitalName);
                        var percent = i.Percent;
                        var rgb = d3.rgb('#090');
                        //console.log(i.CountryName.toUpperCase());
                        d3.select("[country='" + i.CountryName.toUpperCase() + "']").style("fill", function(d) {
                            // console.log(rgb.toString());
                            return heatmapColour(percent);
                        });
                    });

                });

            }


            function redraw() {
                width = $element.offsetWidth;
                height = width / 2;
                d3.select('svg').remove();
                setup(width, height);
                draw(topo);
            }


            function move() {

                var t = d3.event.translate;
                var s = d3.event.scale;
                zscale = s;
                var h = height / 4;


                t[0] = Math.min(
                        (width / height) * (s - 1),
                        Math.max(width * (1 - s), t[0])
                        );

                t[1] = Math.min(
                        h * (s - 1) + h * s,
                        Math.max(height * (1 - s) - h * s, t[1])
                        );

                zoom.translate(t);
                g.attr("transform", "translate(" + t + ")scale(" + s + ")");

                //adjust the country hover stroke width based on zoom level
                d3.selectAll(".country").style("stroke-width", 1.5 / s);

            }



            var throttleTimer;
            function throttle() {
                window.clearTimeout(throttleTimer);
                throttleTimer = window.setTimeout(function() {
                    redraw();
                }, 200);
            }


//geo translation on mouse click in map
            function click() {
                var latlon = projection.invert(d3.mouse(this));
                console.log(latlon);
            }


//function to add points and text to the map (used in plotting capitals)
            function addpoint(lat, lon, text) {

                var gpoint = g.append("g").attr("class", "gpoint");
                var x = projection([lat, lon])[0];
                var y = projection([lat, lon])[1];

                gpoint.append("svg:circle")
                        .attr("cx", x)
                        .attr("cy", y)
                        .attr("class", "point")
                        .attr("r", 1.5);

                //conditional in case a point has no associated text
                if (text.length > 0) {

                    gpoint.append("text")
                            .attr("x", x + 2)
                            .attr("y", y + 2)
                            .attr("class", "text")
                            .text(text);
                }

            }

        }
    };
    return directive;
}
;

/**
 * 
 * 
 */
angular.module('Pension').directive('sparkLine', sparkLine);

function sparkLine($parse) {
    var directive = {
        restrict: 'AE',
        // templateUrl: 'pension/tpls/term/term-search-pageview.html',
        replace: false,
        //our data source would be an array
        //passed thru chart-data attribute
        scope: {},
        link: function(scope, element, attrs) {
            //var color = d3.scale.linear().domain([0,1]).range(["#fed900","#39c"]);
            var color = ["#fed900", "#39c"];

            var width = 100;
            var height = 25;
            var x = d3.scale.linear().range([0, width - 2]);
            var y = d3.scale.linear().range([height - 4, 0]);
            var parseDate = d3.time.format("%b %d, %Y").parse;
            var line = d3.svg.line()
                    .interpolate("basis")
                    .x(function(d) {
                return x(d.date);
            })
                    .y(function(d) {
                return y(d.close);
            });

            function sparkline(elemId, data) {
                data.forEach(function(d) {
                    d.date = parseDate(d.Date);
                    d.close = +d.Close;
                    // d.close = +Math.floor((Math.random() * 10) + 1);
                });
                
               
                // console.log(data);
                
                x.domain(d3.extent(data, function(d) {
                    return d.date;
                }));
                y.domain(d3.extent(data, function(d) {
                    return d.close;
                }));

                var svg = d3.select(elemId)
                        .append('svg')
                         .style({height: height})
                        //.attr('width', width)
                        // .attr('height', height)
                        .append('g')
                        .attr('transform', 'translate(0, 2)');
                
                
                svg.append('path')
                        .datum(data)
                        .attr('class', 'sparkline')
                        .attr('d', line);
                svg.append('circle')
                        .attr('class', 'sparkcircle')
                        .attr('cx', x(data[0].date))
                        .attr('cy', y(data[0].close))
                        .attr('r', 1.5);
            }

            d3.csv(attrs.file, function(error, data) {
                sparkline(element[0], data);
            });
            

        }
    };
    return directive;
}
;

angular.module('Pension').directive('leadingSectors', leadingSectors);
function leadingSectors() {
    var directive = {
        restrict: 'AE',
        replace: true,
        templateUrl: 'pension/tpls/section/leading-sectors.html'
    };
    return directive;
}
;
angular.module('Pension')
.directive('loadingContainer', function () {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var loadingLayer = angular.element('<div class="loading"></div>');
            element.append(loadingLayer);
            element.addClass('loading-container');
            scope.$watch(attrs.loadingContainer, function(value) {
                loadingLayer.toggleClass('ng-hide', !value);
            });
        }
    };
});
})();