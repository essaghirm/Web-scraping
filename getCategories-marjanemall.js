var categories = []

jQuery('.filter-options-content form .level-2 > li').each(function(index){

	

	var level1 = jQuery(this).find('a').text().split('   ')[0]
	var level2 = jQuery(this).parents('li:first').children(":first").text().split('   ')[0]
	var level3 = jQuery(this).parents('li:first').parents('li:first').children(":first").text().split('   ')[0]

	console.log(level1)
	console.log(level2)
	console.log(level3)
	
	var item = {
		level1: jQuery(this).parents('li:first').parents('li:first').children(":first").text().split('   ')[0],
		level2: jQuery(this).parents('li:first').children(":first").text().split('   ')[0],
		level3: jQuery(this).find('a').text().split('   ')[0],
		count: jQuery(this).find('a').text().split('   ')[1].split('   ')[0],
		id: jQuery(this).find('input').attr('value'),
		url: jQuery(this).find('a').attr('href'),
	}

	categories.push(item)

	if (index >= 10) { 
		// console.log(categories)
		// return false
	}
})