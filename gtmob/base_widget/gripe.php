<?php

include 'db_helper.php';

function addGripe($post) {

    $dbQuery = sprintf("INSERT INTO `gripe`(`user_id`,`gripe_title`, `gripe_description`) VALUES (0, '$post[title]' , '$post[content]')");
    $result = getDBResultInserted($dbQuery, 'gripe_id');

    header("Content-type: application/json");
    echo json_encode($result);

}

//high priority
function updateGripe() {
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
function getGripe() {
    
}

function getGripesByUser() {
    /* Return vaild JSON object */
}

function getGripesByRank() {
    /* Return vaild JSON object */
}

function getGripesByRecent() {
    /* Return vaild JSON object */
}

function getGripesByLocation() {
    /* Return vaild JSON object */
}

function getGripesByKeyword() {
    /* Return vaild JSON object */
}
?>