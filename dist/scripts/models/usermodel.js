var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		name: null,
		email: null,
		password: null,
		createdAt:null,
		logged_in: false
		
	},
	validate: function(attr, options){
		if(attr.name === ""){
			return "please enter a name";
		}
		if(attr.password === ""){
			return "please enter a password";
		}
		 else {
			return false;
		}
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/keithedwardreynolds3a',
	idAttribute: '_id'
});

	