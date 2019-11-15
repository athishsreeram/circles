<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<link rel="stylesheet" type="text/css" href="http://localhost/circles1/style.css" />
<script type="text/javascript" src="http://localhost/circles1/jquery-1.11.2.js"></script>
<script type="text/javascript" src="http://localhost/circles1/json2.js"></script>
<script type="text/javascript" src="http://localhost/circles1/prop.js"></script>
<script type="text/javascript" src="http://localhost/circles1/circles.js"></script>
<script type="text/javascript" charset="utf-8">
	
	$(document).ready(function(){
		$("#btnSubmit").click(function() {
			//collect userName and password entered by users
			var userName = $("#username").val();
			var password = $("#password").val();

			//call the authenticate function
			authenticate(userName, password);
		});
	});
</script>
</head>

<section id="loginBox">
    <h2>Login</h2>
    
	<div class="minimal">
        <label for="username">
            Username:
            <input type="text" name="username" id="username" placeholder="Username must be between 8 and 20 characters" pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{8,20}$" required="required" />
        </label>
		<label for="password">
            Password:
            <input type="password" name="password" id="password" placeholder="Password must contain 1 uppercase, lowercase and number" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required="required" />
        </label>
		<button type="submit" class="btn-minimal" name="btnSubmit" id="btnSubmit" >Sign in</button>
    </div>
</section>

</html>