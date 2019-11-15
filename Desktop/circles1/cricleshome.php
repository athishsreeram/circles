<html>
<head>
<meta charset="utf-8" />
<script type="text/javascript"
	src="http://localhost/circles1/jquery-1.11.2.js"></script>
<link rel="stylesheet" type="text/css" href="http://localhost/circles1/style.css" />
<script type="text/javascript" src="http://localhost/circles1/json2.js"></script>
<script type="text/javascript" src="http://localhost/circles1/prop.js"></script>
<script type="text/javascript" src="http://localhost/circles1/circles.js"></script>
<script type="text/javascript" charset="utf-8">
	var map = null;
	function onload(){
		
	var userdetail = window.localStorage.getItem("userdetail");
	userdetail = JSON.parse(userdetail);
	$("#username").html($("#username").html()+" "+userdetail.username);
	$("#userdetail").val(userdetail);
		
	}
</script>
<link href="style.css" rel="stylesheet" type="text/css">
</head>
<body onload="onload()">
<div id="noti_Container" onclick="notificationDetail()">
    <img src="user.png" alt="profile" />
    <div id="noti" class="noti_bubble"></div>
</div>
</div>
	<h3>Welcome</h3>
	<p id="username" >Hi</p>
	<input type="hidden" id="userdetail"/>
	<a href="#" onclick="searchfrd()">Search Friend</a>
	<a href="#" onclick="frdLst()">Friends</a>
	<a href="#" onclick="logout()">Logout</a>
	<a href="#" onclick="frdMap()">Find Friends</a>
	<a href="#" onclick="getLocation()">Get Location</a>
</body>
</html>	