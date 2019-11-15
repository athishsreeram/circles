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
		
	var searchfrddetail = window.localStorage.getItem("searchfrddetail");
	searchfrddetail = JSON.parse(searchfrddetail);
		if(searchfrddetail.request == "send"){
		$("ol").append("<li id='sendid'>"+searchfrddetail.username+" <a href='#' onclick='send("+searchfrddetail.uid+");'>Send Request</a></li>");
		}
		else if(searchfrddetail.request == "accept")
		{
		$("ol").append("<li id='acceptid'>"+searchfrddetail.username+" <a href='#' onclick='accept("+searchfrddetail.uid+");'>Accept Request</a></li>");
		}
		else if(searchfrddetail.request == "cancel")
		{
		$("ol").append("<li id='cancelid'>"+searchfrddetail.username+" <a href='#' onclick='cancel("+searchfrddetail.uid+");'>Cancel Request</a></li>");
		}
		
	}
	
	
</script>
</head>
<body onload="onload()">
	<ol>
	</ol>
	<input type="button" value="Back" onclick="back();" />
</body>
</html>	