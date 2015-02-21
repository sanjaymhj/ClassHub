<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    require_once '../classes/connection.class.php';
    require_once '../classes/user.class.php';

    $obj = new User();
    $obj->setUsername("sabin");
    $obj->setPassword("sabin");
    
    $decodedjson = json_decode($obj->login(),true);
    if($decodedjson['status'] == 1){
        header('Location:myhome.php');
    }else{
        header('Location:myhome.php');
    }
?>