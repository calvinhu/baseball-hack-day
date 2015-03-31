define([
	'backbone.marionette',
],
function(Marionette){
    'use strict';

	return Marionette.AppRouter.extend({
		initialize: function() {
		},
		/* Backbone routes hash */
		appRoutes: {
			"" : "home",
			"population" : "population",
			"*args" : "home",
	   	},
	});
});
