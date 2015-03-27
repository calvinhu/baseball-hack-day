define([
	'backbone',
	'collections/teams',
	'views/item/mapView',
	'views/composite/teamsView',
	'text!tmpl/layout/mainLayout.html'
],
function( Backbone, Teams, MapView, TeamsView, MainLayoutTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			var self = this;
			console.log("initialize a Main Layout");
			this.teams = new Teams();
			this.teams.fetch({
				success: function(collection,response) {
					self.textRegion.show(new TeamsView({collection: self.teams}));
				}
			})
		},
		
    	template: _.template(MainLayoutTmpl),
    	

    	/* Layout sub regions */
    	regions: {
    		mapRegion: '#map',
			textRegion: '#text'
    	},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {},

		onShow: function() {
			this.mapRegion.show(new MapView());

		}
	});

});
