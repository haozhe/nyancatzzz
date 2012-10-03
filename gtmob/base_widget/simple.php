<?php


function listItems() {
	echo "listItems();\n";
}

function getItem($item) {
	echo "getItem(".$item.");\n";
}

function addItem($item) {
	echo "addItem(".$item.");\n";
}

function updateItem($item,$newItem) {
	echo "updateItem(".$item.",".$newItem.");\n";
}

function deleteItem($item) {
	echo "deleteItem(".$item.");\n";
}



////::::::::::::::Gripes.php::::::::::::::::::::
//  //high priority
//  function getGripes(array search_params) {
//  	/* this function should be able to take the folowing search parameters 
//  	User_param
//  	Rank_param
//	loc_param
//	keyword_param
//	*/
//    /*Return vaild JSON object*/    
//  }  
//
//  function getGripesByUser() {
//    /*Return vaild JSON object*/
//  }
//
//  function getGripesByRank() {
//    /*Return vaild JSON object*/
//  }
//
//  function getGripesByLocation() {
//    /*Return vaild JSON object*/    
//  }
//
//  function getGripesByKeyword() {
//    /*Return vaild JSON object*/    
//  }
//
//  //high priority
//  function addGripe() {
//    /*Take in all the form data produces a row in sql gripe table*/    
//  }
//
//
//  //high priority
//  function setGripeStatus() {
//    /*changes serious gripe status in db to resolved, un-resolved(default), or awknoledged*/    
//  }
//  //high priority
//  function voteGripeUp(gripe_ID) {
//    /*Votes up in SQL gripe table for a particular gripe*/    
//  }
//  //high priority
//  function voteGripeDown(gripe_ID) {
//    /*Votes down in SQL gripe table for a particular gripe*/    
//  }
//
////::::::::::::::User.php::::::::::::::::::::
//
//
//  //high priority
//  function createProfile() {
//    /*First time login with cas creates a gripe profile in db*/    
//  }
//
//  //high priority
//  function editProfile(array profile_params) {
//    /*
//      be able to accept the following params
//      _year
//      _major
//      _linkFacebook
//      _linkTwitter
//
//    */    
//  }
//
//  function deleteProfile() {
//    /*First time login with cas creates a gripe profile in db*/    
//  }
//
//  //high priority
//  function getProfile() {
//    /**/    
//  }
//
//
//
////::::::::::::::Management.php::::::::::::::::::::
//
//  //high priority
//  function sendReport() {
//    /* No filtering*/    
//  }
//
//  function getFunnelStats() {
//    /**/    
//  }
//
//  function funnelGripe(){
//    
//  }


?>