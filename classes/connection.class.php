<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    class Connection{
        private $host;
        private $user;
        private $password;
        private $db;
        
        public $conx;
        public $sql;
        public $res;
        
        public $numRows;
        public $affectedRows;
        
        public $err;
        public $data = array();
        
        public function __construct($host='localhost',$user='root',$password='',$db='classhub') {
            $this->setHost($host);
            $this->setUser($user);
            $this->setPassword($password);
            $this->setDatabase($db);
            
            $this->conx = mysqli_connect($this->getHost(), $this->getUser(), $this->getPassword(), $this->getDb());
        }
        
        public function setHost($host){
            $this->host = $host;
        }
        
        public function setUser($user){
            $this->user = $user;
        }
        
        public function setPassword($password){
            $this->password = $password;
        }
        
        public function setDatabase($db){
            $this->db = $db;
        }
        
        public function getHost(){
		return $this->host;	
	}
	
	public function getUser(){
		return $this->user;	
	}
	
	public function getPassword(){
		return $this->password;	
	}
	
	public function getDb(){
		return $this->db;	
	}
        
        
        public function __destruct() {
            mysqli_close($this->conx);
        }
        
    }

?>