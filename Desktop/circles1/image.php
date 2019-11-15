<?php


define('DB_HOST', 'fdb4.your-hosting.net');
define('DB_NAME', '1821344_circles');
define('DB_USER','1821344_circles');
define('DB_PASSWORD','@thish77');


$con=mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) or die("Failed to connect to MySQL host: " . mysql_error());
$db=mysql_select_db(DB_NAME,$con) or die("Failed to connect to MySQL DB: " . mysql_error() ." ".mysql_errno());

print_r($_FILES);
$loc = "C:\\Users\\as\\";
$new_image_name = $_POST['name'].".jpg";
$filePath = $loc.$new_image_name;
move_uploaded_file($_FILES["file"]["tmp_name"],$filePath);

//$data = fopen($filePath,'rb');
$id = $_POST['id'];
$data =addslashes (file_get_contents($filePath));


$sql = "UPDATE user SET `profpic`='$data' WHERE `uid`='$id'";
 

// insert the image
$query = mysql_query($sql) or die("Error in Query: " . mysql_error());
//  $msg='<p>Image successfully saved in database with id ='. mysql_insert_id().' </p>';


if($query === TRUE){
	$query = mysql_query("SELECT *  FROM user where `uid`='$id'") or die(mysql_error());
	$row = mysql_fetch_array($query) or die(mysql_error());
	
	$profpic=$row['profpic'];
	
	//$results = array(
	 // 'a' => "a",
	 // 'profpic' => base64_encode($profpic)
	//);

	//$json = json_encode($results);
	//echo $json;
	//echo '<img src="data:image/png;base64,' . base64_encode($profpic) . '" />';
	echo "success";
}
else{
	echo "failure";
}

?> 