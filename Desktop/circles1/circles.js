function authenticate(userName, password) {
		
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { userdetail : '{"username": "' + userName
								+ '", "password" : "' + password + '"}',
					 login : "yes"},
			success : function(data) {
				//alert(data1.username +" "+ data1.password);
				window.localStorage.setItem("userdetail", JSON.stringify(data));
                //window.location = "location.html";
				window.location.href = appurl+"cricleshome.php";

			},
			error : function(data) {
				console.log(data);
				alert(data.responseText);
			}
		})
}

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else { 
			alert("Geolocation is not supported by this browser.");
			console.log("Geolocation is not supported by this browser.");
		}
	}

	function showPosition(position) {
		//x.innerHTML = "Latitude: " + position.coords.latitude + 
		//"<br>Longitude: " + position.coords.longitude;	
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		addLoc(userdetail.uid,position.coords.latitude,position.coords.longitude);
			
	}
	
	function addLoc(uid,lat,lng){
		var userLoc ='{"uid": "' + uid	+ '", "lat" : "' + lat + '", "lng" : "' + lng + '"}';
			
	  $.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { userdetail : userLoc,
					 addloc : "yes"},
			success : function(data) {
				window.localStorage.setItem("userdetail", JSON.stringify(data));
				alert("Location Shared");
				console.log(data);
			},
			error : function(data) {
				console.log(data);
			}
		})
	
	}
	
	
	//Menu Bar Scripts	
	function searchfrd() {
	
			//collect userName and password entered by users
			var userdetail = window.localStorage.getItem("userdetail");
			userdetail = JSON.parse(userdetail);
			
			//call the authenticate function
			searchfrdLst(userdetail);
	}
	
	function searchfrdLst(userdetail) {
		
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { userdetail : '{"uid": "' + userdetail.uid + '"}',
					 searchfrd : "yes"},
			success : function(data) {
				
				window.localStorage.setItem("searchfrd", JSON.stringify(data));
                //window.location = "location.html";
				window.location = appurl+"searchfrd.php";
			},
			error : function(data) {
				alert("All Are Your Friends");
				console.log(data);
			}
		})
	}
	
	//Auto call Notification Function
	$(document).ready(function()
	{
		setInterval(function() { notificationDisplay(); }, 3000);
	});
	
	function notificationDisplay(){
	var userdetail = window.localStorage.getItem("userdetail");
	userdetail = JSON.parse(userdetail);
	
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { userdetail : '{"uid": "' + userdetail.uid + '"}',
					 notify : "yes"},
			success : function(data) {
				if(data.count != 0){
					$("#noti").html(data.count);				
				}
			},
			error : function(data) {
				console.log(data);
			}
		})		
	}
	
	function notificationDetail(){
	var userdetail = window.localStorage.getItem("userdetail");
	userdetail = JSON.parse(userdetail);
	
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { userdetail : '{"uid": "' + userdetail.uid + '"}',
					 notifydetail : "yes"},
			success : function(data) {
				if(data.length != 0){
				window.localStorage.setItem("notifyDetal", JSON.stringify(data));
                //window.location = "location.html";
				window.location = appurl+"notifyDetail.php";
				}

			},
			error : function(data) {
				console.log(data);
			}
		})		
	}
	
	function logout(){
		window.location = appurl+"login.php";
	}
	
	function frdLst() {
	
			//collect userName and password entered by users
			var userdetail = window.localStorage.getItem("userdetail");
			userdetail = JSON.parse(userdetail);
			
			//call the authenticate function
			frdList(userdetail);
	}
	
	function frdList(userdetail) {
		
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { userdetail : '{"uid": "' + userdetail.uid + '"}',
					 frdslst : "yes"},
			success : function(data) {
				
				window.localStorage.setItem("frdslst", JSON.stringify(data));
                //window.location = "location.html";
				window.location = appurl+"frdslst.php";
			},
			error : function(data) {
				console.log(data);
			}
		})
	}
	function frdMap() {
			var userdetail = window.localStorage.getItem("userdetail");
			userdetail = JSON.parse(userdetail);
			if(userdetail.lat != "" && userdetail.lng != ""){
				mapList(userdetail);
			}else{
				alert("Share your location");
			}
	}
	function mapList(userdetail) {
		
		$.ajax({
			type : "POST",
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			data : { userdetail : '{"uid": "' + userdetail.uid + '"}',
					 frdslstMap : "yes"},
			success : function(data) {
				
				window.localStorage.setItem("mapLst", JSON.stringify(data));
            	window.location = appurl+"map.php";
			},
			error : function(data) {
				console.log(data);
			}
		})
	}
	
	// Frd list php
	function unfriend(fid){
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
	$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
					 unfriend : "yes"},
			success : function(data) {
				if(data.status == "success"){
					$('#'+fid).remove();
				}
			},
			error : function(data) {
				console.log(data);
			}
	})
		
	}
	
	
	// Map JS
	
	function findFriend() {
		var mapLst = window.localStorage.getItem("mapLst");
		mapLst = JSON.parse(mapLst);
		
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		map = showMap(userdetail.lat,userdetail.lng);
		addMarkersToMap(map,userdetail.lat,userdetail.lng,userdetail.username);
		$.each(mapLst, function(index, element) {
			addMarkersToMap(map,element.lat,element.lng,element.username);
		});
	}

	var addMarkersToMap = function(map, lat, lag,name) {
		var latitudeAndLongitudeOne = new google.maps.LatLng(lat, lag);

		var infowindow = new google.maps.InfoWindow({
			content : name
		});

		var markerOne = new google.maps.Marker({
			position : latitudeAndLongitudeOne,
			map : map,
			title : name
		});

		google.maps.event.addListener(markerOne, 'click', function() {
			infowindow.open(map, markerOne);
		});
			
	}

	var showMap = function(lat,lag) {
		var mapOptions = {
			zoom : 17,
			center : new google.maps.LatLng(lat, lag),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map_canvas"),
				mapOptions);
		return map;
	}

	function back(){
		window.location.href = appurl+"cricleshome.php";
	}
	
	// Notification Detail
	
	function accept(fid){
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
	$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
					 acceptfrnd : "yes"},
			success : function(data) {
			if(data.status == "success"){
				$('#'+fid).remove();
			}
			},
			error : function(data) {
				console.log(data);
			}
	})
		
	}
	
	function cancel(fid){
	var userdetail = window.localStorage.getItem("userdetail");
	userdetail = JSON.parse(userdetail);
	
	var notifydetail = window.localStorage.getItem("notifyDetal");
		notifydetail = JSON.parse(notifydetail);
		
	$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
					 cancelfrnd : "yes"},
			success : function(data) {
			if(data.status == "success"){
				$('#'+fid).remove();
			}
			},
			error : function(data) {
				console.log(data);
			}
	})
		
	}
	
	// search Frd
	
	function detail(fid){
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
	
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
					 searchfrddetail : "yes"},
			success : function(data) {
				
				window.localStorage.setItem("searchfrddetail", JSON.stringify(data));
                //window.location = "location.html";
				window.location = appurl+"searchfrdDetail.php";
			},
			error : function(data) {
				console.log(data);
			}
		})
	}

	// search frd Detaiil
	
	function send(fid){
	//to do
	var userdetail = window.localStorage.getItem("userdetail");
	userdetail = JSON.parse(userdetail);
	var searchfrddetail = window.localStorage.getItem("searchfrddetail");
	searchfrddetail = JSON.parse(searchfrddetail);
		
	$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
					 sendrequest : "yes"},
			success : function(data) {
			if(data.status == "success"){
				$('#sendid').remove();
				$("ol").append("<li id='cancelid'>"+searchfrddetail.username+" <a href='#' onclick='cancel("+searchfrddetail.uid+");'>Cancel Request</a></li>");
			}
			},
			error : function(data) {
				console.log(data);
			}
	})
		
	}
	
	function cancel(fid){
	var userdetail = window.localStorage.getItem("userdetail");
	userdetail = JSON.parse(userdetail);
	var searchfrddetail = window.localStorage.getItem("searchfrddetail");
	searchfrddetail = JSON.parse(searchfrddetail);
	
	$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
					 cancelrequest : "yes"},
			success : function(data) {
			if(data.status == "success"){
				$('#cancelid').remove();
				$("ol").append("<li id='sendid'>"+searchfrddetail.username+" <a href='#' onclick='send("+searchfrddetail.uid+");'>Send Request</a></li>");
			}
			},
			error : function(data) {
				console.log(data);
			}
	})
	}
	
	function accept(fid){
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
	$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : { searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
					 acceptfrnd : "yes"},
			success : function(data) {
			if(data.status == "success"){
				$('#acceptid').remove();
			}
			},
			error : function(data) {
				console.log(data);
			}
	})
		
	}