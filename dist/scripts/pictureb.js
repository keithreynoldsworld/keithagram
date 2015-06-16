imageList.fetch({
		success: function(imageObj){
			commentList.fetch();
		}
	});
	
	$('#form-info').on('submit', function(e){
		e.preventDefault();

		var newImage = new ImageModel({
			url: $('#input-img').val(),
			caption: $('#input-caption').val()
		});
		console.log(newImage.get('_id'))
		
			imageList.add(newImage);
			newImage.save();
	 	

			 $('#input-img').val('');
			 $('#input-caption').val('');				
	});

	imageList.on('add', function(imageModel){
		$('.inner').append(buildImageTemplate({model: imageModel}));


		$('[data-form="'+imageModel.cid+'"]').on('submit', function(e){
			e.preventDefault();
			var string = '<span><strong>User: </strong></span>';
			var commentToAdd = new Comment({
				message: string + $(this).find('.comment-input').val(),
			    ImgID: imageModel.get('_id')
			})
			$('.comment-input').val('');
			commentList.add(commentToAdd);
			commentToAdd.save();
		});
	});
	commentList.on('add', function(commentModel){
		var html = buildCommentTemplate({model: commentModel});
		var imageId = commentModel.get('ImgID');
		var imageModel = imageList.get(imageId);
		$('[data-form="'+imageModel.cid+'"] .comment-list').append(html);
	})

	$('.circle').click(function(e){
		$('#form-info').slideToggle('slow');
	})
	$('#cancel-btn').click(function(e){
		e.preventDefault(e);
		$('#input-img').val('');
		$('#input-caption').val('');
	})