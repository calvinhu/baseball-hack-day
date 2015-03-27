define([
	'backbone',
	'models/player'
],
function( Backbone, Player ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			// console.log("initialize a Players collection");
		},

		model: Player,

		setAttributes: function(input) {
			return input
		},

		parse: function(response) {
			var result = this.setAttributes(response);
			return result
		}	
	});
});
