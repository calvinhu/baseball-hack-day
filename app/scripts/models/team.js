define([
	'backbone',
	'collections/players'
],
function( Backbone, Players ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			// console.log(this)
			// console.log("initialize a Team model");
		},

		defaults: {},


		parse: function(response) {
			response.players = new Players(response.players)
			// console.log(response);
			return response
		},
    });
});
