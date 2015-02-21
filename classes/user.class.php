<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



    class User extends Connection{
        
        private $username;
        private $password;
        private $fullname;
        private $date;
        
        public function __construct(){
            parent::__construct();
        }
        
        function getUsername() {
            return $this->username;
        }

        function getPassword() {
            return $this->password;
        }

        function getFullname() {
            return $this->fullname;
        }

        function getDate() {
            return $this->date;
        }

        function setUsername($username) {
            $this->username = $username;
        }

        function setPassword($password) {
            $this->password = $password;
        }

        function setFullname($fullname) {
            $this->fullname = $fullname;
        }

        function setDate($date) {
            $this->date = $date;
        }
        
        public function checkUserExist(){
            $this->sql = "SELECT username from users where username = '$this->username'";
            $this->res = mysqli_query($this->conx, $this->sql);
            $this->numRows = mysqli_num_rows($this->res);
            if($this->numRows > 0){
                return TRUE;
            }else{
                return FALSE;
            }
        }

        public function checkPassword(){
            $this->sql = "SELECT password FROM users where username = '$this->username'";
            $this->res = mysqli_query($this->conx, $this->sql);
            $this->numRows = mysqli_num_rows($this->res);
            if($this->numRows > 0){
                $temp = mysqli_fetch_assoc($this->res);
                if($this->password === $temp["password"]){
                    return TRUE;
                }else{
                    return FALSE;
                }
            }else{
                return FALSE;
            }
        }

        public function addUser(){
            
            if(!$this->checkUserExist()){
                $this->sql = "INSERT INTO users (username,password,name) VALUES ('$this->username','$this->password','$this->fullname')";
                $this->res = mysqli_query($this->conx, $this->sql);
                $this->affectedRows = mysqli_affected_rows($this->conx);
                if($this->affectedRows > 0){
                    $data["status"] = 1;
                    $data["desc"] = "user registration successful";
                    return json_encode($data);
                }else{
                    $data["status"] = 0;
                    $data["desc"] = "user registration unsucessful";
                    return json_encode($data);
                }
            }else{
                $data["status"] = 0;
                $data["desc"] = "username already exists";
                return json_encode($data);
            }
        }
        
        public function login(){
            if($this->checkUserExist()){
                if($this->checkPassword()){
                    $data["status"] = 1;
                    $data["desc"] = "User login credential matched.";
                    return json_encode($data);
                }else{
                    $data["status"] = 0;
                    $data["desc"] = "The password did not match.";
                    return json_encode($data);
                }
            }else{
                $data["status"] = 0;
                $data["desc"] = "User is not registered.";
                return json_encode($data);
            }
        }
        
    }
    
?>