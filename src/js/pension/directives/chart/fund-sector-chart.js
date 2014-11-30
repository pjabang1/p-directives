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
