var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

$(document).ready(function() {
//requirevariable

	var POSTCOLLECTION = require('./collections/postcollection.js');
	var POSTMODEL = require('./models/postmodel.js');
	var COMMENTCOLLECTION = require('./collections/commentcollection.js');
	var COMMENTMODEL = require('./models/commentmodel.js');
	var USERCOLLECTION = require('./collections/usercollection.js');
	var USERMODEL = require('./models/usermodel.js');


	var pbuilder = _.template($('#post-template').html());
	var cbuilder = _.template($('#comment-template').html());
	var ubuilder = _.template($('#user-template').html());

	var postlist = new POSTCOLLECTION();
	var commentlist = new COMMENTCOLLECTION();
	var userlist = new USERCOLLECTION();

	var routerConfig = {
		routes: {
			'':              'login',
			'login':          'login',   
			'register':         'register',   
			'feed':      'feed',  
			'profile/:user': 'profile',  
			
				
		},

		login: function() {
			$('#register').hide();
			$('#feed').hide();
			$('#profile').hide();
			
			$('#addpost').hide();
			$('#login').show();
		},

		register: function() {
			$('#register').show();
			$('#feed').hide();
			$('#profile').hide();
			$('#login').hide();
			$('#addpost').hide();
		},

		feed: function() {
			$('#register').hide();
			$('#feed').show();
			$('#profile').hide();
			$('#login').hide();
			$('#addpost').show();
		},

		profile: function(name) {
			$('#register').hide();
			$('#feed').hide();
			$('#profile').show();
			$('#login').hide();
			$('#addpost').show();
		}
		
	};

	var app = Backbone.Router.extend(routerConfig);

	var myRouter = new app();
	Backbone.history.start();

	// $('#profile-button').click(function(e) {
	// 	var option = {trigger: true};
	// 	var profile = $('#profile').val();
	// 	myRouter.navigate('profile/'+ 'name',option);

	// });
	$('#addpost').on('submit', function(e) {
		e.preventDefault();

		var newpost = new POSTMODEL({
			url: $('#post-url').val(),
			caption: $('#post-caption').val()
		});
		newpost.save();
		postlist.add(newpost);
		
	});

	postlist.fetch({
		
		success: function() {
			commentlist.fetch({
			
				success: function() {
					userlist.fetch();
					
				} 
			});
		}
	});
	console.log(postlist);
	console.log(commentlist);
	console.log(userlist);



	postlist.on('add', function(newpost) {
		var posthtml = pbuilder({model: newpost});
		console.log("picutre addeded");
		$('#feed').append(posthtml);
		$('#user').append(posthtml);

		$(".comment-button").on('submit', function(e) {
			console.log("button pressed");
			e.preventDefault();
			var COMMENTINPUT = $(this).find('.comment-input');

			var newcomment = new COMMENTMODEL({
				text: COMMENTINPUT.val(),
				post_id: newpost.get('_id')
			});
			newcomment.save();
			commentlist.add(newcomment);
			

		})
	});

	commentlist.on('add', function(newcomment) {
		console.log("comment added");
		var commenthtml = cbuilder({model: newcomment});
		var post_id = newcomment.get('post_id');
		var imageModel = postlist.get('post_id');

		$("[data-cid='"+newpost._id+"''] .comment-list").append(commenthtml);
	});
});