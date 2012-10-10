<?php

global $_USER;

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
function updateGripe($gripe_id, $post) {
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
    //echo 'votingup';
    switch ($post['type']) {
        case 'status':
            $dbQuery = sprintf("UPDATE `gripe` SET `status` = '%s' WHERE `gripe_id` = '%s'", 
                    mysql_real_escape_string($post['value']),
                    mysql_real_escape_string($gripe_id));
            break;
        case 'voting_up':
            //echo 'votingup';
            $dbQuery = sprintf("UPDATE `gripe` SET `voting_up` = `voting_up`+'%s' WHERE `gripe_id` = '%s'", 
                    mysql_real_escape_string($post['value']),
                    mysql_real_escape_string($gripe_id));
            break;
        case 'voting_down':
            $dbQuery = sprintf("UPDATE `gripe` SET `voting_down` = `voting_down`+'%s' WHERE `gripe_id` = '%s'", 
                    mysql_real_escape_string($post['value']),
                    mysql_real_escape_string($gripe_id));
            break;
        default:
            break;
    }
		
    $result = getDBResultAffected($dbQuery);
		
    header("Content-type: application/json");
    echo json_encode($result);
    
}

//high priority
function getGripes($get) {
    /* this function should be able to take the folowing search parameters 
      User_param
      Rank_param
      loc_param
      time_param
      keyword_param  //open-ended search
     */
    /* Return vaild JSON object */
    switch ($get['key']) {
        case 'user_id':
            getGripesByUser($get['value']);
            break;
        case 'keyword':
            getGripesByKeyword($get['value']);
            break;
        case 'top':
            getGripesByRank();
            break;
        case 'location':
            getGripesByDistance($get['lat'],$get['lon'],$get['dist']);
            break;
        default:
            break;
    }   
}

//high priority
function getGripe($id) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM gripe INNER JOIN user WHERE gripe.user_id = user.user_id AND gripe.gripe_id ='%s'",
            mysql_real_escape_string($id));
    $result=getDBResultRecord($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
    //did not test
}

function getGripesByUser($user_id) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` WHERE `user_id` = '%s' ORDER BY gripe_id DESC",
            mysql_real_escape_string($user_id));
    $result=getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
    //did not test
}

function getGripesByRank() {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` ORDER BY `voting_up` DESC LIMIT 0,10" );
    $result=getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result); 
}

function getGripesByRecent($recent) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("select * from `gripe` where `created_time` >= Dateadd(day,-1-'%s',getdate()) ORDER BY gripe_id DESC",
            mysql_real_escape_string($recent));
    $result=getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
}

function getGripesByLocation($building_id) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` WHERE `building_id` = '%s'",
            mysql_real_escape_string($building_id));
    $result=  getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
}

function getGripesByDistance($lat, $lon, $dist) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT *, ((ACOS(SIN($lat * PI() / 180)
        * SIN(latitude * PI() / 180) + COS($lat * PI() / 180) 
            * COS(latitude * PI() / 180) * COS(($lon-longitude) 
                * PI() / 180)) * 180 / PI()) * 60 * 1.1515) 
                AS `distance` FROM `gripe` INNER JOIN user HAVING `distance`<=$dist AND gripe.user_id = user.user_id ORDER BY `distance` ASC");
    $result=  getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
}

function getGripesByKeyword($keyword) {
    /* Return vaild JSON object */
    $dbQuery = sprintf("SELECT * FROM `gripe` WHERE `gripe_title` REGEXP '[[:<:]]" . $keyword . "[[:>:]]' OR `gripe_description` REGEXP '[[:<:]]" . $keyword . "[[:>:]]'");
 //           mysql_real_escape_string($keyword));
    $result=  getDBResultsArray($dbQuery);
    header("Content-type: application/json");
    echo json_encode($result);
}
?>