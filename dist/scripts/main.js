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
	postlist.fetch({
		
		success: function() {
			commentlist.fetch({
			
				success: function() {
					userlist.fetch();
					
				} 
			});
		}
	});

	
	$('#addpost').on('submit', function(e) {
		e.preventDefault();

		var newpost = new POSTMODEL({
			url: $('#post-url').val(),
			caption: $('#post-caption').val()
		});
		newpost.save();
		postlist.add(newpost);
		
	});

	
	console.log(postlist);
	console.log(commentlist);
	console.log(userlist);

	postlist.on('add', function(newPost) {
		var posthtml = pbuilder({model: newPost});
		console.log("picutre addeded");
		$('#feed').append(posthtml);
		

		$('[data-form-id="'+newPost.cid+'"]').on('submit', function(e) {
			e.preventDefault();
			console.log("button pressed");
			
			var COMMENTINPUT = $(this).find('.comment-input');

			var newcomment = new COMMENTMODEL({
				text: COMMENTINPUT.val(),
				post_id: newPost.cid
			});
			newcomment.save();
			commentlist.add(newcomment);
			

		})
	});
	
	commentlist.on('add', function(newCOMMENT) {
		console.log("comment added");
		var commenthtml = cbuilder({model: newCOMMENT});
		var post_id = newCOMMENT.get('post_id');
		var postMODEL = postlist.get(post_id);

		$("[data-cid='"+postMODEL.cid+"'] .comment-list").append(commenthtml);
	});
});