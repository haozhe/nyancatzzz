<?php

 //high priority
 function checkUser($CAS_username) {
   /*First time login with cas creates a gripe profile in db*/
    $dbQuery = sprintf("SELECT `user_id` FROM `user` WHERE `CAS_username` = '%s'",
            mysql_real_escape_string($CAS_username));
    if(!$dbQuery){
        $dbQuery2 = sprintf("INSERT INTO `user` '%s'",
        mysql_real_escape_string($CAS_username));
        $dbQuery2 = sprintf("SELECT `user_id` FROM `user` WHERE `CAS_username` = '%s'",
            mysql_real_escape_string($CAS_username));
        $result=getDBResultRecord($dbQuery2);
    }
    else{
        $result=getDBResultRecord($dbQuery);
    }
    
    header("Content-type: application/json");
    echo json_encode($result);
 }
?>