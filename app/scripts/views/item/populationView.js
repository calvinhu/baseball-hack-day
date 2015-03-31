define([
	'backbone',
	'bootgrid',
	'highcharts',
	'text!tmpl/item/populationView.html'
],
function( Backbone, Bootgrid, highcharts, PopulationViewTmpl  ) {
	'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function(options) {
			var self = this;
			Highcharts.setOptions({
				chart: {
					style: {
						fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
						fontSize: '15px'
					}
				}
			});
		},

		className: 'row population-layout',

		template: _.template(PopulationViewTmpl),

		templateHelpers: function() {
			var self = this;
			return {
				getCount: function(){
					return self.model.attributes.result;
				},
				
			}
		},

		sortByKey: function(array, key, reverse) {
			var result = array.sort(function(a, b) {
				var x = a[key]; var y = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
			return reverse ? result : result.reverse()
		},

		renderGraph: function(container,data,reverse) {
			var sortedData = this.sortByKey(data,'count',reverse);
			container.highcharts({
				chart: {
					type: 'bar'
				},
				title: {
					text: 'Number of Players',
				},
				xAxis: {
					categories: sortedData.map(function(a) { return a.location }),
					minorTickLength: 0,
					tickLength: 0,
					gridLineWidth: 0,
					title: {
						text: null
					},
					labels: {
						overflow: 'justify',
						style: {
							fontSize:'15px'
						}
					}
				},
				yAxis: {
					min: 0,
					minorTickLength: 0,
					tickLength: 0,
					gridLineWidth: 0,
					title: {
						text: '',
						align: 'high'
					},
					labels: {
						enabled: false
					}
				},
				tooltip: {
					enabled: false
				},
				plotOptions: {
					bar: {
						dataLabels: {
							style: {
								fontSize: '12px'
							},
							enabled: true
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -40,
					y: 100,
					floating: true,
					borderWidth: 1,
					enabled: false
				},
				credits: {
					enabled: false
				},
				series: [
					{
						name: 'Players',
						color: '#7cb5ec',
						data: sortedData.map(function(a) { return a.count })
					}
				]
			});
		},

		renderNormalizedGraph: function(container,data,reverse) {
			var sortedData = this.sortByKey(data,'normalizedCount',reverse);
			container.highcharts({
				chart: {
					type: 'bar'
				},
				title: {
					text: 'Players (Normalized to players/100K)',
				},
				subtitle: {
					text: ''
				},
				xAxis: {
					categories: sortedData.map(function(a) { return a.location }),
					minorTickLength: 0,
					tickLength: 0,
					gridLineWidth: 0,
					title: {
						text: null
					},
					labels: {
						overflow: 'justify',
						style: {
							fontSize:'15px'
						}
					}
				},
				yAxis: {
					min: 0,
					minorTickLength: 0,
					tickLength: 0,
					gridLineWidth: 0,
					title: {
						text: '',
						align: 'high'
					},
					labels: {
						enabled: false
					}
				},
				tooltip: {
					enabled: false
				},
				plotOptions: {
					bar: {
						dataLabels: {
							style: {
								fontSize: '12px'
							},
							enabled: true
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'top',
					x: -40,
					y: 100,
					floating: true,
					borderWidth: 1,
					enabled: false
				},
				credits: {
					enabled: false
				},
				series: [ 
					{
						name: 'Players per 100K',
						color: '#333',
						data: sortedData.map(function(a) { return parseFloat(a.normalizedCount) })
					}
				]
			});
		},

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onShow: function() {
			$('#population').bootgrid({
				rowCount: -1,
				navigation: 2,
				columnSelection: false,
				caseSensitive: false
			});
			this.renderGraph(
				$('#chart1'),
				this.model.attributes.result,
				false
			);
			this.renderNormalizedGraph(
				$('#chart2'),
				this.model.attributes.result,
				false
			);

		}
	});

});
