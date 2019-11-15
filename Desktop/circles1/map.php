<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="http://localhost/circles1/style.css" />
<script type="text/javascript"
	src="http://maps.googleapis.com/maps/api/js?sensor=false&output=html"></script>
	<script type="text/javascript" src="http://localhost/circles1/json2.js"></script>
<script type="text/javascript" src="http://localhost/circles1/jquery-1.11.2.js"></script>
<script type="text/javascript" src="http://localhost/circles1/prop.js"></script>
<script type="text/javascript" src="http://localhost/circles1/circles.js"></script>
<link
	href="http://localhost/circles1/default.css"
	rel="stylesheet" type="text/css" />
<script type="text/javascript" charset="utf-8">
	var map = null;
	function onload(){
		console.time("concatenation");
		
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		
		map = showMap(userdetail.lat,userdetail.lng);
		addMarkersToMap(map,userdetail.lat,userdetail.lng,userdetail.username);
		
		console.timeEnd("concatenation");

	}
	
</script>
</head>
<body onload="onload()">
	<h3>PhoneGap-GoogleMaps-Plugin</h3>
	<div style="width: 100%; height: 400px" id="map_canvas"></div>
	<form>
	<input type="button" value="Find Friends" onclick="findFriend();" />
	<input type="button" value="Back" onclick="back();" />
	</form>
</body>
</html>