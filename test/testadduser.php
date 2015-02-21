<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    
    require_once('../classes/connection.class.php');
    require_once('../classes/user.class.php');

    $obj = new User();
    $obj->setUsername("sabin");
    $obj->setPassword("hello");
    $obj->setFullname("Sabin Bajracharya");
    $obj->setDate(date('Y-m-d'));
    
    $result = $obj->addUser();
    
    echo "</br>" . json_decode($result);

?>