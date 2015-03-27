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
        
    	/* ui selector cache */
    	ui: {
    	},

		/* Ui events hash */
		events: {
		},

		onShow: function () {
	    },

	});

});
