define([
	'backbone',
	'text!tmpl/item/playerView.html'
],
function( Backbone, PlayerViewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
		},
		
    	template: _.template(PlayerViewTmpl),
        
        templateHelpers: function() {
			var self = this;
			return {
				getHomeCoordinates: function(){
					return self.model.getCoordinates(this.getHomeAddress());
				},
				getHomeAddress: function(){
					return self.model.attributes.birthcity + ', ' + self.model.attributes.birthcountry 
				}
			}
		},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
