var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;


module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		text: null,
		post_id: null,
		user_id:null
	},
	validate: function(attr, options){
		if(attr.text === ""){
			return "The comment should not be empty";
		} 

		else {
			return false;
		}
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/keithedwardreynolds1a',
	idAttribute: '_id'
});