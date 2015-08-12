




	var source   = jQuery("#authPage").html();

	console.log('the source'+source);

	var template = Handlebars.compile(source);

	jQuery('#placeHolder').html(template({title:'Login'}));


