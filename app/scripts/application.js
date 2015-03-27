define([
	'backbone',
	'communicator',
	'routers/router',
	'controllers/controller',
	'views/header',
],

function( Backbone, Communicator, Router, Controller, Header ) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		headerRegion: 'header',
		contentRegion: '#content'
	});

	/* Add initializers here */
	App.addInitializer( function () {
		App.header = new Header()
		App.headerRegion.show(App.header);

		App.controller = new Controller({app: this});
		App.router = new Router({controller: App.controller});
	});

	App.on("initialize:after", function() {
	  	Backbone.history.start();
	  	
	});

	return App;
});
