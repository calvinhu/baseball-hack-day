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

		initialize: function(options) {
			this.model = options.model;
			this.type = options.type;
			this.itemViewOptions = { type: this.type};

			this.collection = this.model.attributes.players;
		},
		
		template: _.template(TeamViewTmpl),

		itemView: PlayerView,

		// className: 'panel panel-default',

		itemViewContainer: "ul",

		templateHelpers: function() {
			var self = this;
			return {
				getType: function(){
					return self.type;
				}
			}
		},

		getHomeCityList: function(type) {
			var self = this;
			return this.collection.map(function(player) {
				var location;
				switch (type) {
					case 'birth':
						location = player.getHomeAddress()
						break;
					case 'highschool':
						location = player.getHighschoolAddress()
						break;
					case 'college':
						location = player.getCollegeAddress();
						break;
				}
				return [player.attributes.full_name, location];
			});
		},

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		

		/* on show callback */
		onShow: function() {
			Communicator.mediator.trigger('drawPoints', this.getHomeCityList(this.type))
		}
	});

});
