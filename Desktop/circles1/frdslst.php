<html>
<head>
<meta charset="utf-8" />
<script type="text/javascript"
	src="http://localhost/circles1/jquery-1.11.2.js"></script>
	<script type="text/javascript" src="http://localhost/circles1/json2.js"></script>
	<script type="text/javascript" src="http://localhost/circles1/prop.js"></script>
<script type="text/javascript" src="http://localhost/circles1/circles.js"></script>
<script type="text/javascript" charset="utf-8">
	function onload(){
		
		var frdslst = window.localStorage.getItem("frdslst");
		var frddata = JSON.parse(frdslst);
		
		if(frddata.length != 0)
		{
		$.each(frddata, function(i, frdslst) {
			$("ol").append("<li id="+frdslst.uid+">"+frdslst.username+" <a href='#' onclick='unfriend("+frdslst.uid+");'>UnFriend</a></li>");
		});
		}else{
			$("#noFrds").html("No Friends :(");
		}
	}
	
</script>
</head>
<body onload="onload()">
	<ol>
	</ol>
	<div id="noFrds"></div>
	<input type="button" value="Back" onclick="back();" />
</body>
</html>	
