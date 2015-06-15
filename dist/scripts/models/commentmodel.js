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
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/keithedwardreynolds1',
	idAttribute: '_id'
});