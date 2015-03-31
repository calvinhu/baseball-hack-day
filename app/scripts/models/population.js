define([
	'backbone',
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
		},

		url: function() {
			return 'data/mlb_roster.json'
		},

		parse: function(input) {
			var locationDict = {};
			var populations = {
				"Alabama":"4799277",
				"Alaska":"720316",
				"Arizona":"6479703",
				"Arkansas":"2933369",
				"California":"37659181",
				"Colorado":"5119329",
				"Connecticut":"3583561",
				"District of Columbia":"619371",
				"Delaware":"908446",
				"Florida":"19091156",
				"Georgia":"9810417",
				"Hawaii":"1376298",
				"Idaho":"1583364",
				"Illinois":"12848554",
				"Indiana":"6514861",
				"Iowa":"3062553",
				"Kansas":"2868107",
				"Kentucky":"4361333",
				"Louisiana":"4567968",
				"Maine":"1328320",
				"Maryland":"5834299",
				"Massachusetts":"6605058",
				"Michigan":"9886095",
				"Minnesota":"5347740",
				"Mississippi":"2976872",
				"Missouri":"6007182",
				"Montana":"998554",
				"Nebraska":"1841625",
				"Nevada":"2730066",
				"New Hampshire":"1319171",
				"New Jersey":"8832406",
				"New Mexico":"2069706",
				"New York":"19487053",
				"North Carolina":"9651380",
				"North Dakota":"689781",
				"Ohio":"11549590",
				"Oklahoma":"3785742",
				"Oregon":"3868721",
				"Pennsylvania":"12731381",
				"Rhode Island":"1051695",
				"South Carolina":"4679602",
				"South Dakota":"825198",
				"Tennessee":"6402387",
				"Texas":"25639373",
				"Utah":"2813673",
				"Vermont":"625904",
				"Virginia":"8100653",
				"Washington":"6819579",
				"West Virginia":"1853619",
				"Wisconsin":"5706871",
				"Wyoming":"570134",
				"Puerto Rico":"3682966",
				"Aruba":"102911",
				"Australia":"23130000",
				"Canada":"35344962",
				"Venezuela":"30410000",
				"Dominican Republic":"10400000",
				"Mexico":"122300000",
				"Colombia":"48320000",
				"Nicaragua":"6080000",
				"Curacao":"153500",
				"Taiwan":"23340000",
				"Cuba":"11270000",
				"Jamaica":"2715000",
				"Japan":"127300000",
				"Netherlands":"16800000",
				"Brazil":"200400000",
				"South Korea":"50220000",
				"Bahamas":"377374",
				"Germany":"80620000",
				"Panama":"3864000"
			};

			function checkAbbr(input) {
				var mappings = {
					"AL":"Alabama",
					"AK":"Alaska",
					"AZ":"Arizona",
					"AR":"Arkansas",
					"CA":"California",
					"CO":"Colorado",
					"CT":"Connecticut",
					"DC":"District of Columbia",
					"DE":"Delaware",
					"FL":"Florida",
					"GA":"Georgia",
					"HI":"Hawaii",
					"ID":"Idaho",
					"IL":"Illinois",
					"IN":"Indiana",
					"IA":"Iowa",
					"KS":"Kansas",
					"KY":"Kentucky",
					"LA":"Louisiana",
					"ME":"Maine",
					"MD":"Maryland",
					"MA":"Massachusetts",
					"MI":"Michigan",
					"MN":"Minnesota",
					"MS":"Mississippi",
					"MO":"Missouri",
					"MT":"Montana",
					"NE":"Nebraska",
					"NV":"Nevada",
					"NH":"New Hampshire",
					"NJ":"New Jersey",
					"NM":"New Mexico",
					"NY":"New York",
					"NC":"North Carolina",
					"ND":"North Dakota",
					"OH":"Ohio",
					"OK":"Oklahoma",
					"OR":"Oregon",
					"PA":"Pennsylvania",
					"RI":"Rhode Island",
					"SC":"South Carolina",
					"SD":"South Dakota",
					"TN":"Tennessee",
					"TX":"Texas",
					"UT":"Utah",
					"VT":"Vermont",
					"VA":"Virginia",
					"WA":"Washington",
					"WV":"West Virginia",
					"WI":"Wisconsin",
					"WY":"Wyoming",
					"PR":"Puerto Rico",
					"VI":"U.S. Virgin Islands",
					"AS":"American Samoa",
					"GU":"Guam"
				}

				return mappings.hasOwnProperty(input) ? mappings[input] : input
			}
			_.each(input.teams, function(team) {
				_.each(team.players, function(player) {
					if (player.birthcountry == 'USA') {
						(checkAbbr(player.birthstate) in locationDict) ? locationDict[checkAbbr(player.birthstate)]++ : locationDict[checkAbbr(player.birthstate)] = 1;
					} else if (player.birthcountry) {
						(player.birthcountry in locationDict) ? locationDict[player.birthcountry]++ : locationDict[player.birthcountry] = 1;
					}
				})
			});

			var normalizedLocationDict = {};
			for (var key in locationDict) {
				if (locationDict.hasOwnProperty(key)) {
					normalizedLocationDict[key] = Number((locationDict[key] / parseInt(populations[key]))*100000).toFixed(3);
				}
			}

			var result = [];
			for (var key in locationDict) {
				if (locationDict.hasOwnProperty(key)) {
					result.push({
						'location': key,
						'count': locationDict[key],
						'normalizedCount': normalizedLocationDict[key],
					});
				}
			}
			return {result:result}
		},
    });
});
