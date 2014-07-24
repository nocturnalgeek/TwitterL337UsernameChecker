function leet_generator(str) {
	var iterations = Math.pow(2,str.length);
	var leet = "4bcd3f6h1jklmn0pqr57uvwxyz";
	var suggestions = {};
	var result;
	for (i=0;i<iterations;i++) {
		result = "";
		var bin = pad(i.toString(2), str.length);
		for (j=0;j<str.length;j++) {
			if (bin.charAt(j)=="1") {
				if (str.charCodeAt(j)>=97)
					result += leet.charAt(str.charCodeAt(j)-97);
				else result += str.charAt(j);
			} else result += str.charAt(j);
		}
		suggestions[result] = true;
   }
   return suggestions;
}

function pad(str, length) {
	while (str.length < length) {
		str = "0" + str;
	}
	return str;
}

$(".form-control").keyup(function(event){
	if(event.keyCode == 13){
		$(".btn").click();
	}
});

$(".btn").click(function() {
	var username = $(".form-control").val().toLowerCase();;
	
	suggestions = leet_generator(username);
	
	var items = "<thead><tr><th>#</th><th>Username</th><th>Availability</th></tr></thead>";
	items += "<tbody>";
	
	var counter = 1;
	$.each(suggestions, function(index, value) {
		items += "<tr class=\"active\" id=\""+index+"\"><td>"+ counter++ +"</td><td>"+index+"</td><td id=\""+index+"-availability\">checking...</td></tr>";
	});
	
	items += "</tbody>";
	$('.table').html(items);
	
	check(suggestions);
	
	_gaq.push(['_trackEvent', 'twitter' ,'search', username]);
});

function check(suggestions) {
	$.each(suggestions, function(index, value) {
		$.getJSON('http://anyorigin.com/dev/get/?url=https%3A//twitter.com/users/username_available%3Fusername%3D'+index+'&callback=?', function(data){
			if(data.contents.msg.indexOf("Available")!=-1){
				$("#"+index).attr('class','success');
				$("#"+index+"-availability").html("available!");
			}
			if(data.contents.msg.indexOf("taken")!=-1){
				$("#"+index).attr('class','danger');
				$("#"+index+"-availability").html("taken");
			}
		});
	});
}