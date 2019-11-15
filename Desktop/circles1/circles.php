<?php

/*
DB Connection Deployment

define('DB_HOST', 'fdb4.your-hosting.net');
define('DB_NAME', '1821344_circles');
define('DB_USER','1821344_circles');
define('DB_PASSWORD','@thish77');
*/
define('DB_HOST', '127.0.0.1');
define('DB_NAME', 'circles');
define('DB_USER','root');
define('DB_PASSWORD','');

class User {
       public $uid = "";
	   public $fullname  = "";
       public $username  = "";
       public $email = "";
	   public $password = "";
	   public $lat = "";
	   public $lng = "";
	   public $date = "";
}

$con=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die("Failed to connect to MySQL host: " . mysql_error());
$db=mysql_select_db(DB_NAME,$con) or die("Failed to connect to MySQL DB: " . mysql_error() ." ".mysql_errno());

if(isset($_POST["login"]) && $_POST["login"] == "yes")
{
  if(isset($_POST['userdetail'])) {
    $userdetaildata = $_POST['userdetail'];
	$manage = json_decode($userdetaildata);
	
	$username = $manage ->username;
	$query = mysql_query("SELECT *  FROM user where username = '$username'") or die(mysql_error());
		
	if(mysql_num_rows($query) > 0){
		$row = mysql_fetch_array($query) or die(mysql_error());
	if($manage ->password != "" && $manage ->password == $row['password']){
	
		$e = new User();
   $e->uid = $row['uid'];
   $e->fullname  = $row['fullname'];
   $e->username = $row['username'];
   $e->email = $row['email'];
   
	echo json_encode($e);
	}else {
		echo "Login Failed Invalid Password";
	}
  }else {
    echo "Login Failed User Not exist";
  }
  }else {
    echo "Login Failed User information is not proper";
  }
  
}

if(isset($_POST["searchfrd"]) && $_POST["searchfrd"] == "yes")
{
//user id not frd lst SELECT * FROM `user` where uid not in (SELECT fid FROM `my_friends` WHERE uid = '$_POST[uid]' AND uid not in (SELECT uid FROM `my_friends` WHERE fid = '$uid' ) AND uid <> '$uid'  )
if(isset($_POST['userdetail'])) {
    $userdetaildata = $_POST['userdetail'];
	$manage = json_decode($userdetaildata);
	
	$uid = $manage ->uid;
	$query = mysql_query("SELECT `uid`, `fullname`, `username`, `email` FROM `user` where uid not in (SELECT fid FROM `my_friends` WHERE uid = '$uid' )AND uid not in (SELECT uid FROM `my_friends` WHERE fid = '$uid' ) AND uid <> '$uid' ") or die(mysql_error());
		
	if(mysql_num_rows($query) > 0){
	$result = array();
	$i = 0;
	while($userrow = mysql_fetch_array($query,MYSQL_ASSOC)){

		$result[$i] = $userrow;
		$i = $i + 1;
	}
   echo json_encode($result);
  }else {
    echo "No Processing";
  }

}
}

if(isset($_POST["searchfrddetail"]) && $_POST["searchfrddetail"] == "yes")
{
//'friend detail' SELECT * FROM `user` where uid = '$_POST[fid]'

// 'check friend request fid' SELECT * FROM `friend_request` where  uid = '$_POST[uid]' and fid = '$_POST[fid]' 

// send request or cancel request

if(isset($_POST['searchfrddetailId'])) {
    $searchfrddetailId = $_POST['searchfrddetailId'];
	$manage = json_decode($searchfrddetailId);
	
	$fid = $manage ->fid;
	$uid = $manage ->uid;
	
	$query2 = mysql_query("SELECT * FROM `friend_request` where  (uid = '$uid' and fid = '$fid')") or die(mysql_error());
		
	if(mysql_num_rows($query2) > 0){
		$request = "cancel";
	}else{
		$request = "send";
	}
	
	$query2 = mysql_query("SELECT * FROM `friend_request` where (fid = '$uid' and uid = '$fid')") or die(mysql_error());
		
	if(mysql_num_rows($query2) > 0){
		$request = "accept";
	}
	
	
	$query = mysql_query("SELECT * FROM `user` where uid = '$fid'") or die(mysql_error());
		
	if(mysql_num_rows($query) > 0){
	$row = mysql_fetch_array($query) or die(mysql_error());
	   $uid = $row['uid'];
	   $fullname  = $row['fullname'];
	   $username = $row['username'];
	   $email = $row['email'];
	}
	
	
	
	$result = ["uid"=>$uid,"fullname"=>$fullname,"username"=>$username,"email"=>$email,"request" => $request];
   echo json_encode($result);
 }else {
    echo "No Processing";
 }
}




if(isset($_POST["sendrequest"]) && $_POST["sendrequest"] == "yes")
{
//'1 Display add frd requst on second user profile click friend request uid and fid'
// INSERT INTO `friend_request`(`id`, `uid`, `fid`) VALUES (null,'$_POST[uid]','$_POST[fid]');
if(isset($_POST['searchfrddetailId'])) {
    $searchfrddetailId = $_POST['searchfrddetailId'];
    $manage = json_decode($searchfrddetailId);
	
	$fid = $manage ->fid;
	$uid = $manage ->uid;
	
	$query = mysql_query("INSERT INTO `friend_request`(`id`, `uid`, `fid`) VALUES (null,'$uid','$fid')") or die(mysql_error());
	
	if($query === TRUE)
	{
		$result = ["status" => "success"];
   }else {
		$result = ["status" => "failure"];
	}
		echo json_encode($result);
}	
}



if(isset($_POST["cancelrequest"]) && $_POST["cancelrequest"] == "yes")
{
//'2 Display cancel frd request on click delete frd request'
//DELETE FROM `friend_request` WHERE uid = '$_POST[uid]' and fid = '$_POST[fid]'
if(isset($_POST['searchfrddetailId'])) {
    $searchfrddetailId = $_POST['searchfrddetailId'];
	$manage = json_decode($searchfrddetailId);
	
	$fid = $manage ->fid;
	$uid = $manage ->uid;
	
	$query = mysql_query("DELETE FROM `friend_request` WHERE (uid = '$uid' and fid = '$fid') or (uid = '$fid' and fid = '$uid')") or die(mysql_error());
	
	if($query === TRUE)
	{
		$result = ["status" => "success"];
   }else {
		$result = ["status" => "failure"];
	}
		echo json_encode($result);	
}		
}

if(isset($_POST["notify"]) && $_POST["notify"] == "yes")
{
//user id frd request lst
//'C. Notification to uid'
//SELECT * FROM `user` where uid in (SELECT fid FROM `friend_request` where uid = '$_POST[uid]')
// show both accept and cancel

if(isset($_POST['userdetail'])) {
    $userdetaildata = $_POST['userdetail'];
	$manage = json_decode($userdetaildata);
	
	$uid = $manage ->uid;
	$query = mysql_query("SELECT * FROM `user` where uid in (SELECT uid FROM `friend_request` where fid = '$uid')") or die(mysql_error());
	$result = array();	
	
	$count = mysql_num_rows($query);
	
	$result = ["count" => $count];
	echo json_encode($result);

	}
	
}

if(isset($_POST["notifydetail"]) && $_POST["notifydetail"] == "yes")
{
//user id frd request lst
//'C. Notification to uid'
//SELECT * FROM `user` where uid in (SELECT fid FROM `friend_request` where uid = '$_POST[uid]')
// show both accept and cancel

if(isset($_POST['userdetail'])) {
    $userdetaildata = $_POST['userdetail'];
	$manage = json_decode($userdetaildata);
	
	$uid = $manage ->uid;
	$query = mysql_query("SELECT * FROM `user` where uid in (SELECT uid FROM `friend_request` where fid = '$uid')") or die(mysql_error());
	$result = array();	
	
	$i = 0;
	while($userrow = mysql_fetch_array($query,MYSQL_ASSOC)){

		$result[$i] = $userrow;
		$i = $i + 1;
	}
	echo json_encode($result);

	}
}

if(isset($_POST["acceptfrnd"]) && $_POST["acceptfrnd"] == "yes")
{
//'1 click on add as frnd'
//INSERT INTO `my_friends`(`id`, `uid`, `fid`) VALUES (null,'$_POST[uid]','$_POST[fid]');
//DELETE FROM `friend_request` WHERE uid = '$_POST[uid]' and  fid = '$_POST[fid]'
	if(isset($_POST['searchfrddetailId'])) {
    $searchfrddetailId = $_POST['searchfrddetailId'];
	$manage = json_decode($searchfrddetailId);
	
	$fid = $manage ->fid;
	$uid = $manage ->uid;
	
	$query = mysql_query("INSERT INTO `my_friends`(`id`, `uid`, `fid`) VALUES (null,'$uid','$fid')") or die(mysql_error());
	
	if($query === TRUE)
	{
		$result = ["status" => "success"];
   }else {
		$result = ["status" => "failure"];
	}
	
	$query = mysql_query("DELETE FROM `friend_request` WHERE fid = '$uid' and uid = '$fid'") or die(mysql_error());
	
	if($query === TRUE)
	{
		$result = ["status" => "success"];
   }else {
		$result = ["status" => "failure"];
	}
		echo json_encode($result);	
	
}
}
if(isset($_POST["cancelfrnd"]) && $_POST["cancelfrnd"] == "yes")
{
//'2 click cancel'
//DELETE FROM `friend_request` WHERE uid = '$_POST[uid]' and fid = '$_POST[fid]'
if(isset($_POST['searchfrddetailId'])) {
    $searchfrddetailId = $_POST['searchfrddetailId'];
	$manage = json_decode($searchfrddetailId);
	
	$fid = $manage ->fid;
	$uid = $manage ->uid;

$query = mysql_query("DELETE FROM `friend_request` WHERE fid = '$uid' and uid = '$fid'") or die(mysql_error());
	
	if($query === TRUE)
	{
		$result = ["status" => "success"];
   }else {
		$result = ["status" => "failure"];
	}
		echo json_encode($result);	
}	
}

if(isset($_POST["frdslst"]) && $_POST["frdslst"] == "yes")
{
//User id give lst
//'B. list of frds'
//SELECT * FROM `my_friends` WHERE uid = '$_POST[uid]' or fid = '$uid' 
//SELECT * FROM `user` where uid in (SELECT fid FROM `my_friends` WHERE uid = '$_POST[uid]' AND uid in (SELECT uid FROM `my_friends` WHERE fid = '$uid' ) AND uid <> '$uid'
if(isset($_POST['userdetail'])) {	
    $userdetaildata = $_POST['userdetail'];
	$manage = json_decode($userdetaildata);
	
	$uid = $manage ->uid;
	$query = mysql_query("SELECT `uid`, `fullname`, `username` FROM `user` where `uid` in (SELECT `fid` FROM `my_friends` WHERE `uid` = '$uid') AND `uid` <> '$uid'") or die(mysql_error());
	
	$result = array();	
	$i = 0;
	if(mysql_num_rows($query) > 0){
	while($userrow = mysql_fetch_array($query,MYSQL_ASSOC)){

		$result[$i] = $userrow;
		$i = $i + 1;
	}
	}
	$query = mysql_query("SELECT `uid`, `fullname`, `username` FROM `user` where `uid` in (SELECT `uid` FROM `my_friends` WHERE `fid` = '$uid') AND `uid` <> '$uid'") or die(mysql_error());
	
	if(mysql_num_rows($query) > 0){
	while($userrow = mysql_fetch_array($query,MYSQL_ASSOC)){

		$result[$i] = $userrow;
		$i = $i + 1;
	}
	
   }
   
  	echo json_encode($result);	
   
}


}

if(isset($_POST["unfriend"]) && $_POST["unfriend"] == "yes")
{
//'Disp Unfriend'
//DELETE FROM `my_friends` WHERE uid = '$_POST[uid]' and fid = '$_POST[fid]'

if(isset($_POST['searchfrddetailId'])) {
    $searchfrddetailId = $_POST['searchfrddetailId'];
	$manage = json_decode($searchfrddetailId);
	
	$fid = $manage ->fid;
	$uid = $manage ->uid;
	
	$query = mysql_query("DELETE FROM `my_friends` WHERE uid = '$uid' and fid = '$fid'") or die(mysql_error());
	
	if($query === TRUE)
	{
		$result = ["status" => "success"];
   }else {
		$result = ["status" => "failure"];
	}
	
	$query = mysql_query("DELETE FROM `my_friends` WHERE fid = '$uid' and uid = '$fid'") or die(mysql_error());
	
	if($query === TRUE)
	{
		$result = ["status" => "success"];
	}else {
		$result = ["status" => "failure"];
	}
	
	
	echo json_encode($result);	
	
}

}


if(isset($_POST["addloc"]) && $_POST["addloc"] == "yes")
{
if(isset($_POST['userdetail'])) {
    $userdetaildata = $_POST['userdetail'];
    $manage = json_decode($userdetaildata);
	
	$uid = $manage ->uid;
	$lat = $manage ->lat;
	$lng = $manage ->lng;

	$query = mysql_query("UPDATE `user` SET `lng`='$lng',`lat`='$lat' WHERE `uid`='$uid'") or die(mysql_error());
	
	if($query === TRUE)
	{
		$query = mysql_query("SELECT *  FROM user where `uid`='$uid'") or die(mysql_error());
		
	if(mysql_num_rows($query) > 0){
		$row = mysql_fetch_array($query) or die(mysql_error());
			$e = new User();
		$e->uid = $row['uid'];
		$e->fullname  = $row['fullname'];
		$e->username = $row['username'];
		$e->email = $row['email'];
		$e->lng = $row['lng'];
		$e->lat = $row['lat'];
		   
		$result = $e;
	}
   }else {
		$result = ["status" => "failure"];
	}
	echo json_encode($result);
}  
}

if(isset($_POST["frdslstMap"]) && $_POST["frdslstMap"] == "yes")
{
//User id give lst
//'B. list of frds'
//SELECT * FROM `my_friends` WHERE uid = '$_POST[uid]' or fid = '$uid' 
//SELECT * FROM `user` where uid in (SELECT fid FROM `my_friends` WHERE uid = '$_POST[uid]' AND uid in (SELECT uid FROM `my_friends` WHERE fid = '$uid' ) AND uid <> '$uid'
if(isset($_POST['userdetail'])) {	
    $userdetaildata = $_POST['userdetail'];
	$manage = json_decode($userdetaildata);
	
	$uid = $manage ->uid;
	$query = mysql_query("SELECT `uid`, `fullname`, `username`, `email`, `lng`, `lat`, `password` FROM `user` where uid in (SELECT fid FROM `my_friends` WHERE uid = '$uid') AND uid <> '$uid'") or die(mysql_error());
	
	$result = array();	
	$i = 0;
	if(mysql_num_rows($query) > 0){
	while($userrow = mysql_fetch_array($query,MYSQL_ASSOC)){

		$result[$i] = $userrow;
		$i += 1;
	}
	}
	$query = mysql_query("SELECT `uid`, `fullname`, `username`, `email`, `lng`, `lat`, `password` FROM `user` where uid in (SELECT uid FROM `my_friends` WHERE fid = '$uid') AND uid <> '$uid'") or die(mysql_error());
	
	if(mysql_num_rows($query) > 0){
	while($userrow = mysql_fetch_array($query,MYSQL_ASSOC)){

		$result[$i] = $userrow;
		$i += 1;
	}
	
   }
	echo json_encode($result);
   }
}

?>