<?php
require "connect.php";
require "create_conn.php";

$sql="UPDATE dochadzky SET prichod=STR_TO_DATE('".$_POST["check_in"]."','%e.%c.%Y %H:%i:%s'), 
	odchod=STR_TO_DATE('".$_POST["check_out"]."','%e.%c.%Y %H:%i:%s')
	WHERE id=".$_POST["atd_id"]."";
$result = $conn->query($sql);

$response=array();

if ($conn->affected_rows == 0){
	$response["state"]="no_changes";
}else if ($conn->affected_rows == 1){
	$response["state"]="update_succesfull";
}

echo json_encode($response);
?>
