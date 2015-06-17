var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

module.exports = Backbone.Model.extend({
	defaults: {
		_id: null,
		url: 'http://www.journalism.columbia.edu/system/photos/2990/original/Coronel_Sheila.gif?1365706240',
		caption: null,
		createdAt: null,
		no_likes: 0,
		user_id: null
	},
	urlRoot: 'http://tiny-pizza-server.herokuapp.com/collections/keithedwardreynolds2',
	idAttribute: '_id'
});
