define([
	'backbone',
	'views/composite/teamView',
	'text!tmpl/composite/teamsView.html'
],
function( Backbone, TeamView, TeamsViewTmpl  ) {
	'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a TeamsView Layout");
		},
		
		template: _.template(TeamsViewTmpl),
		
		// itemView: TeamView,

		/* ui selector cache */
		ui: {},

		regions: {
    		playersRegion: '#players',
    	},

		/* where are we appending the items views */
		// itemViewContainer: "select",

		/* Ui events hash */
		events: {
			'click button': 'submitTeamAndType'
		},

		submitTeamAndType: function() {
			var self = this;
			var team = this.$('#teamSelect').find('option:selected').val();
			var type = this.$('#typeSelect').find('option:selected').val();
    		
    		this.playersRegion.show(
    			new TeamView({
    				model: self.collection.where({abbr: team})[0],
    				type: type
    			})
			);
		},

		/* on render callback */
		onRender: function() {}
	});

});
