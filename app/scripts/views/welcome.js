define([
	'backbone',
	'communicator',
	'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCcpcWi9-yvHPtwMLFiWAhqUFMmOXc3t6E',
	'text!tmpl/welcome.html'
],
function( Backbone, Communicator, gmaps, WelcomeTmpl  ) {
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

			var mapOptions = {
				center: { lat: -34.397, lng: 150.644},
				zoom: 8
			};
			
			var map = new google.maps.Map(document.getElementById('map-canvas'),
				    mapOptions);
	    },

	});

});
