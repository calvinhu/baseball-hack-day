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
			return '/giants_roster.json'
		},

		setAttributes: function(input) {
			return input.teams
		},

		parse: function(response) {
			var result = this.setAttributes(response);
			return result
		}	
	});
});
