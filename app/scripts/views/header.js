define([
	'backbone',
	'communicator',
	'text!tmpl/header.html'
],
function( Backbone, Communicator, WelcomeTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function(options) {
		},
		
    	template: _.template(WelcomeTmpl),

    	templateHelpers: {
    	},

    	className: 'navbar navbar-default navbar-fixed-top',
        
    	/* ui selector cache */
    	ui: {
    	},

		/* Ui events hash */
		events: {
			'click .clickable': 'makeActive'
		},

		makeActive: function(e) {
			this.$('li').removeClass('active');
			$(e.currentTarget).addClass('active');
		},

		onShow: function () {
	    },

	});

});
