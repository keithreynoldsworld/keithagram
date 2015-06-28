

var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

var ppost = require("../models/PostModel.js");

module.exports = Backbone.Collection.extend({
	model: ppost,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/keithedwardreynolds2a'
});