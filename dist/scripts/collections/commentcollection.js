
var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

var cpost = require("../models/commentmodel.js");

module.exports = Backbone.Collection.extend({
	model: cpost,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/keithedwardreynolds1'
});