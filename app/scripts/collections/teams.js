define([
	'backbone',
	'models/team'
],
function( Backbone, Team ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Teams collection");
		},

		model: Team,

		url: function() {
			return 'data/mlb_roster.json'
		},

		setAttributes: function(input) {
			var locationDict = {};
			var populations = {
				"AL":"4799277",
				"AK":"720316",
				"AZ":"6479703",
				"AR":"2933369",
				"CA":"37659181",
				"CO":"5119329",
				"CT":"3583561",
				"DC":"619371",
				"DE":"908446",
				"FL":"19091156",
				"GA":"9810417",
				"HI":"1376298",
				"ID":"1583364",
				"IL":"12848554",
				"IN":"6514861",
				"IA":"3062553",
				"KS":"2868107",
				"KY":"4361333",
				"LA":"4567968",
				"ME":"1328320",
				"MD":"5834299",
				"MA":"6605058",
				"MI":"9886095",
				"MN":"5347740",
				"MS":"2976872",
				"MO":"6007182",
				"MT":"998554",
				"NE":"1841625",
				"NV":"2730066",
				"NH":"1319171",
				"NJ":"8832406",
				"NM":"2069706",
				"NY":"19487053",
				"NC":"9651380",
				"ND":"689781",
				"OH":"11549590",
				"OK":"3785742",
				"OR":"3868721",
				"PA":"12731381",
				"RI":"1051695",
				"SC":"4679602",
				"SD":"825198",
				"TN":"6402387",
				"TX":"25639373",
				"UT":"2813673",
				"VT":"625904",
				"VA":"8100653",
				"WA":"6819579",
				"WV":"1853619",
				"WI":"5706871",
				"WY":"570134",
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
			_.each(input.teams, function(team) {
				_.each(team.players, function(player) {
					if (player.birthcountry == 'USA') {
						(player.birthstate in locationDict) ? locationDict[player.birthstate]++ : locationDict[player.birthstate] = 1;
					} else if (player.birthcountry) {
						(player.birthcountry in locationDict) ? locationDict[player.birthcountry]++ : locationDict[player.birthcountry] = 1;
					}
				})
			});

			var normalizedLocationDict = {}
			for (var key in locationDict) {
				if (locationDict.hasOwnProperty(key)) {
					normalizedLocationDict[mappings.hasOwnProperty(key) ? mappings[key] : key] = Number((locationDict[key] / parseInt(populations[key]))*1000000).toFixed(2);
				}
			}

			return input.teams
		},

		parse: function(response) {
			var result = this.setAttributes(response);
			return result
		}	
	});
});
