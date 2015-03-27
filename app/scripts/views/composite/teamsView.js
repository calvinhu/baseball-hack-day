define([
	'backbone',
	'views/composite/teamView',
	'text!tmpl/composite/teamsView.html'
],
function( Backbone, TeamView, TeamsViewTmpl  ) {
	'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a TeamsView CompositeView");
		},
		
		template: _.template(TeamsViewTmpl),
		
		itemView: TeamView,

		/* ui selector cache */
		ui: {},

		/* where are we appending the items views */
		itemViewContainer: "#accordion",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
