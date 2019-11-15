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
		
		var notifydetail = window.localStorage.getItem("notifyDetal");
		notifydetail = JSON.parse(notifydetail);
		
		$.each(notifydetail, function(i, searchfrd) {
			$("ol").append("<li id="+searchfrd.uid+">"+searchfrd.username+" <a href='#' onclick='accept("+searchfrd.uid+");'>Accept</a> <a href='#' onclick='cancel("+searchfrd.uid+");'>Cancel</a></li>");
		});
	}
	
</script>
</head>
<body onload="onload();">
	<ol>
	</ol>
	<input type="button" value="Back" onclick="back();" />
</body>
</html>	
