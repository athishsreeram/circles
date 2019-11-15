// Login JS

function authenticate(userName, password) {
console.time("concatenation");
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : {
				userdetail : '{"username": "' + userName + '", "password" : "'
						+ password + '"}',
				login : "yes"
			},
			success : function(data) {
				if (data.username != "") {
					$.mobile.loading("hide");
					console.timeEnd("concatenation");
					window.localStorage.setItem("userdetail", JSON
							.stringify(data));
					navigator.app
							.loadUrl("file:///android_asset/www/home.html");
				}
			},
			error : function(data) {
				$.mobile.loading("hide");
				console.log(data);
				if (typeof data.responseText != 'undefined') {
					$("#error").html("Error in login " + data.responseText);
				} else {
					$("#error").html("Trun On Your Internet");
				}
			}
		})
	}

//Home share location
	function share() {
		/* console.log("Share " + $('#switch').is(":checked"));
		if ($("#flip").val() == "on") {
			console.log("On"); 
			interval = setInterval(function() {*/
		onoff = window.localStorage.getItem("onoff");
		console.log(onoff);
		if (onoff == null) {
			console.log(onoff);
			onoff = 1;
			window.localStorage.setItem("onoff", onoff);
			$("#flip")[0].selectedIndex = onoff;
		} else {
			console.log(onoff);
			$("#flip")[0].selectedIndex = onoff;
		}
		console.log(onoff);
		$("#flip").slider('refresh');

		if (onoff == 1) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError, {
				maximumAge : 3000,
				timeout : 5000,
				enableHighAccuracy : true
			});
		} else {
			$("#error").html("Turn On Your Share Location");
		}
		/* }, 3000);
		} else {
		clearInterval(interval);
		console.log("Turn off");
		} */

	}

	// onSuccess Geolocation
	function onSuccess(position) {
		console.log(position);
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);

		addLoc(userdetail.uid, position.coords.latitude,
				position.coords.longitude);

	}

	function addLoc(uid, lat, lng) {
		var userLoc = '{"uid": "' + uid + '", "lat" : "' + lat + '", "lng" : "'
				+ lng + '"}';

		$
				.ajax({
					type : "POST",
					//the url where you want to sent the userName and password to
					url : appurl+"circles.php",
					dataType : 'json',
					async : false,
					//json object to sent to the authentication url
					data : {
						userdetail : userLoc,
						addloc : "yes"
					},
					success : function(data) {
						window.localStorage.setItem("userdetail", JSON
								.stringify(data));
						// alert("Location Shared");
						console.log(data);
					},
					error : function(data) {
						//	alert("Location failed"+data.responseText);
						console.log(data);
					}
				});

	}

	function onError(error) {

		$("#error")
				.html(
						"On Your GPS <button class='ui-btn' onclick='window.location.reload()'>Refresh</button>");
		//alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');

	}
	
	// Menu Bar JS
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
			data : {
				userdetail : '{"uid": "' + userdetail.uid + '"}',
				searchfrd : "yes"
			},
			success : function(data) {

				window.localStorage.setItem("searchfrd", JSON.stringify(data));
				navigator.app
						.loadUrl("file:///android_asset/www/searchfrd.html");
			},
			error : function(data) {
				console.log(data);
			}
		})
	}

	function notificationDisplay() {
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);

		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : {
				userdetail : '{"uid": "' + userdetail.uid + '"}',
				notify : "yes"
			},
			success : function(data) {
				if (data.count != 0) {
					$(".count").html(data.count);
				}
			},
			error : function(data) {
				console.log(data);
			}
		});
	}

	function notificationDetail() {
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);

		$
				.ajax({
					type : "POST",
					//the url where you want to sent the userName and password to
					url : appurl+"circles.php",
					dataType : 'json',
					async : false,
					//json object to sent to the authentication url
					data : {
						userdetail : '{"uid": "' + userdetail.uid + '"}',
						notifydetail : "yes"
					},
					success : function(data) {
						if (data.length != 0) {
							window.localStorage.setItem("notifyDetal", JSON
									.stringify(data));
							navigator.app
									.loadUrl("file:///android_asset/www/notifydetail.html");
						}

					},
					error : function(data) {
						console.log(data);
					}
				});
	}

	function logout() {
		localStorage.clear();
		navigator.app.loadUrl("file:///android_asset/www/index.html");
	}

	function home() {
		navigator.app.loadUrl("file:///android_asset/www/home.html");
	}

	function frdLst() {

		//collect userName and password entered by users
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);

		//call the authenticate function
		frdList(userdetail);
	}

	function frdList(userdetail) {

		$
				.ajax({
					type : "POST",
					//the url where you want to sent the userName and password to
					url : appurl+"circles.php",
					dataType : 'json',
					async : false,
					//json object to sent to the authentication url
					data : {
						userdetail : '{"uid": "' + userdetail.uid + '"}',
						frdslst : "yes"
					},
					success : function(data) {

						window.localStorage.setItem("frdslst", JSON
								.stringify(data));
						//window.location = "location.html";
						//window.location = "http://localhost/circles/friend/frdslst.php";
						navigator.app
								.loadUrl("file:///android_asset/www/frdslst.html");
					},
					error : function(data) {
						console.log(data);
					}
				});
	}

	function frdMap() {
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		if (userdetail.lat != "" && userdetail.lng != "") {
			mapList(userdetail);
		} else {
			alert("Share your location");
		}
	}
	function mapList(userdetail) {

		$.ajax({
			type : "POST",
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			data : {
				userdetail : '{"uid": "' + userdetail.uid + '"}',
				frdslstMap : "yes"
			},
			success : function(data) {

				window.localStorage.setItem("mapLst", JSON.stringify(data));
				navigator.app
						.loadUrl("file:///android_asset/www/location.html");
			},
			error : function(data) {
				console.log(data);
			}
		});
	}

	function onoffFun(sel) {
		onoff = sel.value;
		console.log(onoff);
		window.localStorage.setItem("onoff", onoff);
	}

	function camera() {
		navigator.app.loadUrl("file:///android_asset/www/camera.html");
	}

	function camera1() {
		navigator.app.loadUrl("file:///android_asset/www/camera1.html");
	}
	
	
// Frdlst


	function unfriend(fid) {
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : {
				searchfrddetailId : '{"uid": "' + userdetail.uid
						+ '", "fid" : "' + fid + '"}',
				unfriend : "yes"
			},
			success : function(data) {
				if (data.status == "success") {
					$('#' + fid).remove();
					$("#frdlst").listview("refresh");
				}
			},
			error : function(data) {
				console.log(data);
			}
		})

	}	
	
// location

function findFriend() {
		var mapLst = window.localStorage.getItem("mapLst");
		mapLst = JSON.parse(mapLst);

		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		map = showMap(userdetail.lat, userdetail.lng);
		addMarkersToMap(map, userdetail.lat, userdetail.lng,
				userdetail.username);
		$.each(mapLst, function(index, element) {
			addMarkersToMap(map, element.lat, element.lng, element.username);
		});
	}

	var addMarkersToMap = function(map, lat, lag, name) {
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

	var showMap = function(lat, lag) {
		var mapOptions = {
			zoom : 17,
			center : new google.maps.LatLng(lat, lag),
			mapTypeId : google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map_canvas"),
				mapOptions);
		return map;
	}
	
// Notify detail
function accept(fid) {
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : {
				searchfrddetailId : '{"uid": "' + userdetail.uid
						+ '", "fid" : "' + fid + '"}',
				acceptfrnd : "yes"
			},
			success : function(data) {
				if (data.status == "success") {
					$('#' + fid).remove();
				}
			},
			error : function(data) {
				console.log(data);
			}
		})

	}

	function cancel(fid) {
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
			data : {
				searchfrddetailId : '{"uid": "' + userdetail.uid
						+ '", "fid" : "' + fid + '"}',
				cancelfrnd : "yes"
			},
			success : function(data) {
				if (data.status == "success") {
					$('#' + fid).remove();
				}
			},
			error : function(data) {
				console.log(data);
			}
		})

	}
	
// search frd

function detail(fid) {
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);

		$
				.ajax({
					type : "POST",
					//the url where you want to sent the userName and password to
					url : appurl+"circles.php",
					dataType : 'json',
					async : false,
					//json object to sent to the authentication url
					data : {
						searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
						searchfrddetail : "yes"
					},
					success : function(data) {

						window.localStorage.setItem("searchfrddetail", JSON
								.stringify(data));
						
						navigator.app
								.loadUrl("file:///android_asset/www/searchfrdDetail.html");
					},
					error : function(data) {
						console.log(data);
					}
				})
	}
	
// Search Frd Detail
function send(fid) {
		//to do
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		var searchfrddetail = window.localStorage.getItem("searchfrddetail");
		searchfrddetail = JSON.parse(searchfrddetail);

		$
				.ajax({
					type : "POST",
					//the url where you want to sent the userName and password to
					url : appurl+"circles.php",
					dataType : 'json',
					async : false,
					//json object to sent to the authentication url
					data : {
						searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
						sendrequest : "yes"
					},
					success : function(data) {
						if (data.status == "success") {
							$('#sendid').remove();
							$("#friendDetail")
									.append(
											"<li id='cancelid'><a href='#'><img src='image/frd.png'><h2>"
													+ searchfrddetail.username
													+ "</h2> <p><strong>Cancel Request</strong></p><a href='#' onclick='cancel("
													+ searchfrddetail.uid
													+ ");'>Cancel Request</a></a></li>");
							$("#friendDetail").listview("refresh");
						}
					},
					error : function(data) {
						console.log(data);
					}
				})
	}

	function cancel(fid) {
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		var searchfrddetail = window.localStorage.getItem("searchfrddetail");
		searchfrddetail = JSON.parse(searchfrddetail);

		$
				.ajax({
					type : "POST",
					//the url where you want to sent the userName and password to
					url : appurl+"circles.php",
					dataType : 'json',
					async : false,
					//json object to sent to the authentication url
					data : {
						searchfrddetailId : '{"uid": "' + userdetail.uid
								+ '", "fid" : "' + fid + '"}',
						cancelrequest : "yes"
					},
					success : function(data) {
						if (data.status == "success") {
							$('#cancelid').remove();
							$("#friendDetail")
									.append(
											"<li id='sendid'><a href='#'><img src='image/frd.png'><h2>"
													+ searchfrddetail.username
													+ " </h2><p><strong>Send Request</strong></p><a href='#' onclick='send("
													+ searchfrddetail.uid
													+ ");'>Send Request</a></a></li>");
							$("#friendDetail").listview("refresh");
						}
					},
					error : function(data) {
						console.log(data);
					}
				})
	}

	function accept(fid) {
		var userdetail = window.localStorage.getItem("userdetail");
		userdetail = JSON.parse(userdetail);
		$.ajax({
			type : "POST",
			//the url where you want to sent the userName and password to
			url : appurl+"circles.php",
			dataType : 'json',
			async : false,
			//json object to sent to the authentication url
			data : {
				searchfrddetailId : '{"uid": "' + userdetail.uid
						+ '", "fid" : "' + fid + '"}',
				acceptfrnd : "yes"
			},
			success : function(data) {
				if (data.status == "success") {
					$('#acceptid').remove();
				}
			},
			error : function(data) {
				console.log(data);
			}
		})

	}