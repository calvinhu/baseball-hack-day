define([
	'backbone',
	'communicator',
	'spin',
	'models/population',
	'views/layout/mainLayout',
	'views/item/populationView',
],
function( Backbone, Communicator, Spinner, Population, MainLayoutView, PopulationView) {
    'use strict';

	return Backbone.Marionette.Controller.extend({
		initialize: function(options){
			var self = this;
			this.app = options.app;
		},

		home: function(){
            this.app.contentRegion.show(new MainLayoutView());
		},

		population: function(){
			var self = this;
			var population = new Population();
			population.fetch({
				success: function(response) {
            		self.app.contentRegion.show(new PopulationView({model:population}));
					
				}
			});
		},

	});

});
