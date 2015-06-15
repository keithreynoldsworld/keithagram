var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

	var routerConfig = {
		routes: {
			'':              'login',
			'login':          'login',   // #help
			'register':         'register',   // #about
			'feed':      'feed',   // #projects
			'profile/:user': 'profile',  // #profile/Aaron
			
				
		},

		login: function() {
			$('#register').hide();
			$('#feed').hide();
			$('#profile').hide()
			$('#login').show();
		},

		register: function() {
			$('#register').show();
			$('#feed').hide();
			$('#profile').hide();
			$('#login').hide();
		},

		feed: function() {
			$('#register').hide();
			$('#feed').show();
			$('#profile').hide();
			$('#login').hide();
		},

		profile: function(name) {
			$('#register').hide();
			$('#feed').hide();
			$('#profile').show();
			$('#login').hide();
		}
		
	};

	var app = Backbone.Router.extend(routerConfig);

	var myRouter = new app();
	Backbone.history.start();

	$('#profile-button').click(function(e) {
		var option = {trigger: true};
		var profile = $('#profile').val();
		myRouter.navigate('profile/'+ 'name',option);

	});
