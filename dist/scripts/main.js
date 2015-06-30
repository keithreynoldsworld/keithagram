var $ = require("jquery");
var Backbone = require("backbone");
var _ = require("backbone/node_modules/underscore");
Backbone.$ = $;

$(document).ready(function() {
    var currentuser = {current:"nobody"};

	var POSTCOLLECTION = require('./collections/PostCollection.js');
	var POSTMODEL = require('./models/PostModel.js');
	var COMMENTCOLLECTION = require('./collections/CommentCollection.js');
	var COMMENTMODEL = require('./models/CommentModel.js');
	var USERCOLLECTION = require('./collections/UserCollection.js');
	var USERMODEL = require('./models/UserModel.js');


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
			$('#feed').show();
			$('#profile').show();
			$('#login').hide();
			$('#addpost').show();
		}
		
	};

	$('#profile').html(ubuilder({currentuser}));

	var app = Backbone.Router.extend(routerConfig);

	var myRouter = new app();
	Backbone.history.start();


	userlist.fetch();
		
	$('#login-form').on('submit', function(e){
		e.preventDefault();
		console.log(userlist);
		userIsInList = userlist.findWhere({
			name: $('#login-name').val(),
			password: $('#login-password').val()
		});
		if(userIsInList){
			$('#whoops').hide();
			currentuser.current = $('#login-name').val();
			$('#profile').html(ubuilder({currentuser}));
			
			//userIsInList.set({logged_in: true});
			var user =  $('#login-name').val();				
			myRouter.navigate('profile/'+user, {trigger: true});
		}
		else{$('#whoops').html('Your username and or password is incorrect.');
		}			
	});

	

	$('#register-form').on('submit', function(e){
		e.preventDefault();
		var newUser = new USERMODEL({
		name: $('#register-name').val(),
		password: $('#register-password').val()
		});
		newUser.save();
		currentuser.current=$('#register-name').val();
		$('#profile').html(ubuilder({currentuser}));
		var query =  $('#register-name').val();
		myRouter.navigate('profile/'+query, {trigger: true})
	});

	postlist.fetch({
		success: function() {
			commentlist.fetch();
		}
	});


	
	$('#addpost').on('submit', function(e) {
		e.preventDefault();

		var newpost = new POSTMODEL({
			url: $('#post-url').val(),
			caption: $('#post-caption').val(),
			name: currentuser.current
		});
		newpost.save();
		postlist.add(newpost);
		myRouter.navigate('profile/'+ currentuser.current, {trigger: true})
		
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
				post_id: newPost.cid,
				user: currentuser.current
			});
			newcomment.save();
			commentlist.add(newcomment);
		})
	});


		
	
	commentlist.on('add', function(newCOMMENT) {
		var U = newCOMMENT.get('user');
		var UM = userlist.get(U);
		var commenthtml = cbuilder({model: newCOMMENT});
		var post_id = newCOMMENT.get('post_id');
		var postMODEL = postlist.get(post_id);

		$("[data-cid='"+post_id+"'] .comment-list").append(commenthtml);
	});


	
});

















