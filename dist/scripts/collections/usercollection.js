

var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

var upost = require("../models/UserModel.js");

module.exports = Backbone.Collection.extend({
	model: upost,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/keithedwardreynolds3a'
});