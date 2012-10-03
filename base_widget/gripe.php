<?php

include 'db_helper.php';

function addGripe($post) {

    $dbQuery = sprintf("INSERT INTO `gripe`(`user_id`,`latitude`,`longitude`,`building_id`,`room_id`,`category_id`,
        `anonymous`,`serious`,`gripe_title`,`gripe_description`,`gripe_picture`) 
        VALUES ('$post[user_id]]', '$post[latitude]' , '$post[longitude]', '$post[building_id]' ,
            '$post[room_id]' , '$post[category_id]' , '$post[anonymous]' , '$post[serious]' 
                , '$post[gripe_title]' , '$post[gripe_description]' , '$post[gripe_picture]' )");
    $result = getDBResultInserted($dbQuery, 'gripe_id');

    header("Content-type: application/json");
    echo json_encode($result);

}

//high priority
function updateGripe($gripe_id, $status, $voting_up, $voting_down) {
//?status = # of status 0~ 3
//& vote = 1/-1
//return 1 sucess -1 fail

    /*
      Was the following now because we re-structured api we have 1 function that handles all 3 of these:
      function setGripeStatus() {
      //changes serious gripe status in db to resolved,0un-resolved(default), or awknoledged
      }
      function voteGripeUp(gripe_ID) {
      //Votes up in SQL gripe table for a particular gripe
      }
      function voteGripeDown(gripe_ID) {
      //Votes down in SQL gripe table for a particular gripe
      }
     */
    $dbQuery = sprintf("UPDATE `gripe` SET `status` = '%s' AND `voting_up` += '%s' AND `voting_down` += '%s' WHERE `gripe_id` = '%s'",
	mysql_real_escape_string($status),
	mysql_real_escape_string($voting_up),
        mysql_real_escape_string($voting_down),
	mysql_real_escape_string($gripe_id));
		
    $result = getDBResultAffected($dbQuery);
		
    header("Content-type: application/json");
    echo json_encode($result);
    //return?
    
}

//high priority
function getGripes() {
    /* this function should be able to take the folowing search parameters 
      User_param
      Rank_param
      loc_param
      time_param
      keyword_param  //open-ended search
     */
    /* Return vaild JSON object */
}

//high priority
function getGripe($id) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` WHERE `gripe_id` = '%s'",
            mysql_real_escape_string($id));
    $result=getDBResultRecord($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
    //did not test
}

function getGripesByUser($user_id) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` WHERE `user_id` = '%s'",
            mysql_real_escape_string($user_id));
    $result=getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
    //did not test
}

function getGripesByRank($rank) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` WHERE order by `voting_up`",
            mysql_real_escape_string($rank));
    $result=getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
    //need way to order and take the top $rank
}

function getGripesByRecent($recent) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("select * from `gripe` where `createdtime` >= Dateadd(day,-1-'%s',getdate())",
            mysql_real_escape_string($recent));
    $result=getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
    //did not test
}

function getGripesByLocation($building_id) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` WHERE `building_id` = '%s'",
            mysql_real_escape_string($building_id));
    $result=  getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
    //did not test
}

function getGripesByKeyword($keyword) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` WHERE ",
            mysql_real_escape_string($keyword));
    $result=  getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
    //how to search
}
?>