<?php

	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		$username = empty($_POST['username'])?'No User Name':'';
		$password = empty($_POST['password'])?'No Password':'';
		
		if(empty($username) and empty($password)){
			$db = new DB_Functions();
			$result_username = $db->checkUserNameExist($_POST['username']);
			$db->checkPassword($_POST['username'],$_POST['password']);
		}else{
			echo "$username <br> $password";
		}
		
	}else{
		header('Location:index.php');
		echo "Page does not exist";
	}
?>