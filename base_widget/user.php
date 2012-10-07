<?php
//::::::::::::::User.php::::::::::::::::::::
 //high priority
 function addUser($CAS_username) {
   /*First time login with cas creates a gripe profile in db*/
    $dbQuery = sprintf("INSERT INTO `user` '%s'",
        mysql_real_escape_string($CAS_username));
    
    $result = getDBResultInserted($dbQuery, 'user_id');

    header("Content-type: application/json");
    echo json_encode($result);
 }

 //high priority
 function checkUser($post) {
    //echo $post[CAS_username];
   /*First time login with cas creates a gripe profile in db*/
    $dbQuery = sprintf("SELECT * FROM user WHERE CAS_username = '$post[CAS_username]'");
    echo $dbQuery;
    $result=mysql_query($dbQuery);
    echo $result;
    header("Content-type: application/json");
    echo json_encode($result);
 //   if(!$dbQuery){
  //      $dbQuery2 = sprintf("INSERT INTO `user` '%s'",
  //     mysql_real_escape_string($post[CAS_username]));
  //      $dbQuery2 = sprintf("SELECT `user_id` FROM `user` WHERE `CAS_username` = '%s'",
  //          mysql_real_escape_string($post[CAS_username]));
  //      $result=getDBResultRecord($dbQuery2);
  //  }
  //  else{
        
  //  }
    
    
 }
 //high priority
 function editUser($POST) {
   /*
     be able to accept the following params
     _degree
     _major
     _department
     _linkFacebook
     _linkTwitter

   */
    
    if($post["user_category"]==0){
        //whether user_id exists, if yes, update, if no, insert.
        $dbQuery = sprintf("UPDATE `user` SET `major_id` = '%s' AND `degree_id` = '%s' AND `Facebook_username` = '%s'
            AND `Twitter_username` = '%s' WHERE `user_id` = '%s'",
            VALUES ('$post[major_id]]', '$post[degree_id]' ,'$post[Facebook_username]' ,'$post[Twitter_username]' , '$post[user_id]'));
    }
    elseif($post["user_category"]==1 || $post["user_category"]==2){
        $dbQuery = sprintf("UPDATE `user` SET `department_id` = '%s'AND `Facebook_username` = '%s'
            AND `Twitter_username` = '%s' WHERE `user_id` = '%s'",
            VALUES ('$post[department_id]]','$post[Facebook_username]' ,'$post[Twitter_username]', '$post[user_id]'));
    }
    
    $result = getDBResultAffected($dbQuery);
		
    header("Content-type: application/json");
    echo json_encode($result);
    
    
 }

 function deleteUser() {
   /*First time login with cas creates a gripe profile in db*/    
 }

 //high priority
 function getUser($user_id) {
   /**/    
     $dbQuery = sprintf("SELECT * FROM `user` WHERE `user_id` = '%s'",
            mysql_real_escape_string($user_id));
    $result=getDBResultRecord($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
 }

 function getUsers(){

 }


?>
