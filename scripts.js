$(function(){
	// lookup tweet
	$('#lookup-form').on('click', '.find', function() {
		event.preventDefault();
		var nameInput = $('#lookup-name');
		$.ajax({
			url: '/parsedTweets',
			contentType: 'application/json',
			success: function(response) {
				console.log(response);
				var tbodyEL = $('tbody');

				tbodyEL.html('');
				console.log("Name input: " + nameInput.val());
				response.parsedTweets.forEach(function(parsedTweets) {
					if(parsedTweets.screen_name === nameInput.val())
					tbodyEL.append('\
							<tr>\
								<td><input type = "text" class="date" value="' + parsedTweets.created_at + '"</td>\
								<td><input type = "text" class="ID" value="' + parsedTweets.id_str + '"</td>\
								<td><input type = "text" class="screen_name" value="' + parsedTweets.screen_name + '"</td>\
								<td><input type = "text" class="text" value="' + parsedTweets.text + '"</td>\
								<td>\
									<button class ="update-button">\
										UPDATE</button>\
								</td>\
								</tr>\
						');
				});
			}
		});
	});

	//Get all tweets
	$('#get-all').on('click', function() {
		event.preventDefault();
		$.ajax({
			url: '/parsedTweets',
			contentType: 'application/json',
			success: function(response) {
				console.log(response);
				var tbodyEL = $('tbody');

				tbodyEL.html('');
				response.parsedTweets.forEach(function(parsedTweets) {
					tbodyEL.append('\
							<tr>\
								<td><input type = "text" class="date" value="' + parsedTweets.created_at + '"</td>\
								<td><input type = "text" class="ID" value="' + parsedTweets.id_str + '"</td>\
								<td><input type = "text" class="screen_name" value="' + parsedTweets.screen_name + '"</td>\
								<td><input type = "text" class="text" value="' + parsedTweets.text + '"</td>\
								<td>\
									<button class ="update-button">\
										UPDATE</button>\
								</td>\
								</tr>\
						');
				});
			}
		});
	});

	// CREATE/POST

	$('#text-form').on('click', '.create', function(event) {
		event.preventDefault();
		var nameInput = $('#name-input');
		var textInput = $('#text-input');
		var idInput = $('#id-input');
		$.ajax({
			url: '/parsedTweets',
			method: 'POST',
			contentType: 'application/json',
			data: 
				JSON.stringify({ name: nameInput.val(), text: textInput.val(), id: idInput.val()}),
			success: function(response) {
				nameInput.val('');
				textInput.val('');
				idInput.val('');
			}
		});
	});
	// UPDATE/PUT
	$('table').on('click', '.update-button', function(){
		var rowEl = $(this).closest('tr');
		var id = rowEl.find('.screen_name').val();
		//var newName = rowEl.find('.name').val();
		var newText = rowEl.find('.text').val();
		console.log(id);

		$.ajax({
			url: '/parsedTweets/' + id,
			method: 'PUT',
			contentType: 'application/json',
			data: 
				JSON.stringify({ text: newText }),
			success: function(response) {
				console.log(response);
			}
		});
	});

	// DELETE
	$('#Delete-ID').on('click', '.delete-button', function() {
		event.preventDefault();
		var id = $('#ID-To-Delete');
		$.ajax({
			url: '/parsedTweets/',
			method: 'DELETE',
			contentType: 'application/json',
			data: JSON.stringify({ id_string: id.val()}),
			success: function(response) {
				console.log(response);
			}
		});
	});

	// UPDATE NAME
	$('#new-name-form').on('click', '.update-name', function() {
		event.preventDefault();
		var oldName = $('#old-name');
		var newName = $('#new-name');
		console.log("makes it here");
		$.ajax({
			url: '/parsedTweets/',
			method: 'COPY',
			contentType: 'application/json',
			data: JSON.stringify({ oldName: oldName.val(), newName: newName.val()}),
			success: function(response) {
				console.log(response);
			}
		});
	});
	function test_print(){

         console.log(“test code”)

	}
});