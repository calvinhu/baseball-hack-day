define([
	'backbone',
	'models/player',
	'text!tmpl/item/playerView.html'
],
function( Backbone, Player, PlayerViewTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function(options) {
			this.type = options.type;
		},
		
    	template: _.template(PlayerViewTmpl),

    	model: Player,

    	templateHelpers: function() {
			var self = this;
			return {
				getHomeCoordinates: function(){
					return self.model.getHomeCoordinates();
				},
				getHomeAddress: function(){
					return self.model.getHomeAddress();
				},
				getHighschoolAddress: function(){
					return self.model.getHighschoolAddress();
				},
				getCollegeAddress: function(){
					return self.model.getCollegeAddress();
				},
				getDisplayAddress: function(){
					switch (self.type) {
						case 'birth':
							return this.getHomeAddress()
							break;
						case 'highschool':
							return this.getHighschoolAddress()
							break;
						case 'college':
							return this.getCollegeAddress();
							break;
					}
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
