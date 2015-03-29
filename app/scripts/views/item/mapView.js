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
		
		id: 'map-container',
		/* ui selector cache */
		ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {},

		onShow: function() {
			this.initializeMap();
		},

		updateProgressBar: function(fraction) {
			var percent = fraction * 100;
			if (percent == 100) {
				this.$('#mapProgressContainer').hide();
			}

			this.$('#mapProgress').width(percent + '%');
		},

		initializeMap: function() {
			this.infowindow = new google.maps.InfoWindow();
			this.latlng = new google.maps.LatLng(39.50,-98.35);
			var mapOptions = {
				zoom: 3,
				minZoom: 2,
				center: this.latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
			this.geo = new google.maps.Geocoder(); 
			this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			this.bounds = new google.maps.LatLngBounds();
			this.markersArray = [];
		},

		renderMap: function() {
			var self = this;
			var delay = 100;
			var nextAddress = 0;
			var latlongs = [];

			for (var i = 0; i < self.markersArray.length; i++) {
				self.markersArray[i].setMap(null);
			}
			this.$('#mapProgressContainer').show();

			// ====== Geocoding ======
			function getAddress(search, next) {
				// search object is [name,address]
				if (search[1] == '') {
					next();
				}
				self.geo.geocode({address:search[1]}, function (results,status) { 
						if (status == google.maps.GeocoderStatus.OK) {
							var p = results[0].geometry.location;
							var lat=p.lat();
							var lng=p.lng();

							createMarker(search[1],lat,lng, search[0]);
							latlongs.push({
								'name': search[0],
								'highschool':search[1],
								'lat': lat,
								'lng': lng
							})
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
				self.markersArray.push(marker);
				google.maps.event.addListener(marker, 'click', function() {
					self.infowindow.setContent(contentString); 
					self.infowindow.open(self.map,marker);
				});
				self.bounds.extend(marker.position);
			}

			// ======= An array of locations that we want to Geocode ========
			var addresses = self.points;

			// ======= Function to call the next Geocode operation when the reply comes back
			function theNext() {
				if (nextAddress < addresses.length) {
					self.updateProgressBar((nextAddress+1)/addresses.length)
					setTimeout(function() { getAddress(addresses[nextAddress-1],theNext) }, delay);
					nextAddress++;
				} else {
					self.map.fitBounds(self.bounds);
				}
			}
			theNext();
		}
	
	});

});
