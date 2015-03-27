define([
	'backbone'
],
function( Backbone ) {
	'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
		},

		getCoordinates: function(location) {
			$.ajax({
				type: "GET",
				url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURI(location) + "&key=AIzaSyCcpcWi9-yvHPtwMLFiWAhqUFMmOXc3t6E",
				success: function (response) {
					console.log(response.results[0].geometry.location);
					return response.results[0].geometry.location;
				},
				error: function (response) {
					console.log(response);
				},
			});
		},

		defaults: {},

	});
});
