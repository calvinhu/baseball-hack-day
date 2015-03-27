define([
	'backbone',
	'communicator',
	'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCcpcWi9-yvHPtwMLFiWAhqUFMmOXc3t6E',
	'text!tmpl/item/mapView.html'
],
function( Backbone, Communicator, gmaps, MapViewTmpl  ) {
	'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			var self = this;
			console.log("initialize a Mapview ItemView");
			Communicator.mediator.on('drawPoints', function(points) {
				self.points = points;
				self.renderMap();
			});
		},
		
		template: _.template(MapViewTmpl),
		

		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {},

		onShow: function() {
			this.initializeMap();
		},

		initializeMap: function() {
			this.infowindow = new google.maps.InfoWindow();
			this.latlng = new google.maps.LatLng(-34.397, 150.644);
			var mapOptions = {
				zoom: 2,
				center: this.latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.geo = new google.maps.Geocoder(); 
			this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			this.bounds = new google.maps.LatLngBounds();
		},

		renderMap: function() {
			var self = this;
			var delay = 100;

			// ====== Geocoding ======
			function getAddress(search, next) {
				// search object is [name,address]
				self.geo.geocode({address:search[1]}, function (results,status) { 
						if (status == google.maps.GeocoderStatus.OK) {
							var p = results[0].geometry.location;
							var lat=p.lat();
							var lng=p.lng();
							createMarker(search[1],lat,lng, search[0]);
						}
						else {
							// === if we were sending the requests to fast, try this one again and increase the delay
							if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
								nextAddress--;
								delay++;
							}
						}
						next();
					}
				);
			}

			// ======= Function to create a marker
			function createMarker(add,lat,lng,name) {
				var contentString = '<p>' + name + '<br />' + add + '</p>';
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(lat,lng),
					map: self.map,
					zIndex: Math.round(self.latlng.lat()*-100000)<<5
				});
				google.maps.event.addListener(marker, 'click', function() {
					self.infowindow.setContent(contentString); 
					self.infowindow.open(self.map,marker);
				});
				self.bounds.extend(marker.position);
			}

			// ======= An array of locations that we want to Geocode ========
			var addresses = self.points

			// ======= Global variable to remind us what to do next
			var nextAddress = 0;

			// ======= Function to call the next Geocode operation when the reply comes back
			function theNext() {
				if (nextAddress < addresses.length-1) {
					setTimeout(function() { getAddress(addresses[nextAddress],theNext) }, delay);
					nextAddress++;
				} else {
					self.map.fitBounds(self.bounds);
				}
			}
			theNext();
		}
	
	});

});
