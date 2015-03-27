define([
	'backbone',
	'communicator',
	'spin',
	'views/layout/mainLayout'
],
function( Backbone, Communicator, Spinner, MainLayoutView) {
    'use strict';

	return Backbone.Marionette.Controller.extend({
		initialize: function(options){
			var self = this;
			this.app = options.app;
		},

		home: function(){
            this.app.contentRegion.show(new MainLayoutView());
		},

	});

});
