<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="http://localhost/circles1/style.css" />
<script type="text/javascript" src="http://localhost/circles1/json2.js"></script>
<script type="text/javascript" src="http://localhost/circles1/jquery-1.11.2.js"></script>
<script type="text/javascript" src="http://localhost/circles1/prop.js"></script>
<script type="text/javascript" src="http://localhost/circles1/circles.js"></script>

<script type="text/javascript" charset="utf-8">
	function onload(){
		
		var searchfrd = window.localStorage.getItem("searchfrd");
		var searchfrddata = JSON.parse(searchfrd);
		
		$.each(searchfrddata, function(i, searchfrd) {
			$("ol").append("<li>"+searchfrd.username+" <a href='#' onclick='detail("+searchfrd.uid+");'>Detail</a></li>");
		});
	}
	
		
</script>
</head>
<body onload="onload()">
	<ol>
	</ol>
	<input type="button" value="Back" onclick="back();" />
</body>
</html>	
