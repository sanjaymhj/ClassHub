<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['name'])){
    require_once '../classes/connection.class.php';
    require_once '../classes/user.class.php';

    $obj = new User();
    $obj->setUsername($_POST['username']);
    $obj->setPassword($_POST['password']);
    $obj->setFullname($_POST['name']);
    
    $decodedjson = json_decode($obj->addUser(),true);
    //echo $obj->addUser();
    if($decodedjson['status'] === 1){
        setcookie("result",1,time()+4000);
    }
    else{
        setcookie("result",0,time()+4000);
    }
    header('Location:../index.php');
}

?>