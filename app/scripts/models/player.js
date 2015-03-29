define([
	'backbone'
],
function( Backbone ) {
	'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			if (this.attributes.birthcity === undefined || this.attributes.birthcity === null) {
				this.attributes.birthcity = '';
			}
			if (this.attributes.birthstate === undefined) {
				this.attributes.birthstate = '';
			}
			if (this.attributes.birthcountry === undefined) {
				this.attributes.birthcountry = '';
			}
			if (this.attributes.high_school === undefined) {
				this.attributes.high_school = '';
			}
			if (this.attributes.college === undefined) {
				this.attributes.college = '';
			}
		},

		getHomeAddress: function(){
			if (this.attributes.birthcity == '') {
				return '';
			} else {
				if (this.attributes.birthcountry == 'Canada') {
					return this.attributes.birthcity + ', ' + this.attributes.birthstate + ' ' + this.attributes.birthcountry;
				} else if (this.attributes.birthstate != '') {
					return this.attributes.birthcity + ', ' + this.attributes.birthstate;
				} else {
					return this.attributes.birthcity + ', ' + this.attributes.birthcountry;
				}
			}
			
		},
		getHighschoolAddress: function(){
			return this.attributes.high_school;
		},
		getCollegeAddress: function(){
			return this.attributes.college;
		},

		defaults: {},

	});
});
