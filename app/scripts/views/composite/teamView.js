define([
	'backbone',
	'communicator',
	'views/item/playerView',
	'text!tmpl/composite/teamView.html'
],
function( Backbone, Communicator, PlayerView, TeamViewTmpl  ) {
	'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			this.collection = this.model.attributes.players;
		},
		
		template: _.template(TeamViewTmpl),

		itemView: PlayerView,

		className: 'panel panel-default',

		itemViewContainer: "ul",

		getHomeCityList: function() {
			var self = this;
			return this.collection.map(function(player) {
				return [player.attributes.full_name, player.attributes.birthcity + ', ' + player.attributes.birthcountry];
			});
		},

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		

		/* on show callback */
		onShow: function() {
			Communicator.mediator.trigger('drawPoints', this.getHomeCityList())
		}
	});

});
