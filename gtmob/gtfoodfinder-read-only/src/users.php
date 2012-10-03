<?php
	include_once 'db_helper.php';

	/*
	 * Get detail info of a specific user
	 * @param $uid - user id
	 * @return A json object with all details of user $uid
	 */
	function getUserInfo($uid) {
		$dbQuery = sprintf("SELECT users.id AS uid, users.xing AS numOfFriends, ".
							" users.picture AS userImg, ". 
							" meals.name AS foodName, meals.picture AS foodImg, ".
							" comments.comment, comments.timestamp, ".
							" helpful FROM `users`, `comments`, `meals` ". 
							" WHERE comments.uid = users.id AND comments.mid = meals.id AND ".
							" comments.uid = '%s'",
							mysql_real_escape_string($uid));
		$result = getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Check if a user already exists, if not insert one into database
	 * @param $uid - user id
	 * @return 1 if user exists, otherwise return a json object with personId
	 */
	function createUser($uid) {
		$dbQuery = sprintf("SELECT COUNT(*) FROM users WHERE id='%s'",
			mysql_real_escape_string($uid)
		);
		$result = getDBResultRecord($dbQuery);
		if ($result['COUNT(*)'] != 0) {
			echo 1;
			return;
		}
		
		$dbQuery = sprintf("INSERT INTO users (id) VALUES ('%s')",
			mysql_real_escape_string($uid));
		$result = getDBResultInserted($dbQuery,'personId');
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Not in use
	 */
	function updateUser($uid, $userinfo) {
		$dbQuery = sprintf("UPDATE users SET displayname = '%s' WHERE id = '%s'",
			mysql_real_escape_string($userinfo),
			mysql_real_escape_string($uid));
		
		$result = getDBResultAffected($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Not in use
	 */
	function deleteUser($uid) {
		$dbQuery = sprintf("DELETE FROM users WHERE id = '%s'",
			mysql_real_escape_string($uid));												
		$result = getDBResultAffected($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * List user's friends list
	 * @param $uid - user id
	 * @return A json object with user's friend list, each item has uid, picture, numoffriends
	 */
	function listFriends($uid) {
		$dbQuery = sprintf("SELECT friendlist.fid AS fid, users.picture AS friendImg, users.xing AS numOfFriends FROM friendlist, users WHERE uid='%s' AND friendlist.fid=users.id",
			mysql_real_escape_string($uid));
		$result = getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Add a user as friend. After calling this, user $fid will show up in user $uid's friend list,
	 * but $uid will not show up in $fid's list because $fid has not added $uid as a friend.
	 * @param $uid - user id
	 * @param $fid - user id
	 */
	function addFriend($uid, $fid) {
		
		$dbQuery = sprintf("SELECT COUNT(*) FROM friendlist WHERE uid='%s' AND fid='%s'",
			mysql_real_escape_string($uid),
			mysql_real_escape_string($fid)
		);
		$result = getDBResultRecord($dbQuery, 'exists');
		if ($result['COUNT(*)'] != 0) {
			echo "$fid is already your friend.";
			return;
		}
		
		$dbQuery = sprintf("UPDATE users SET xing = xing + 1 WHERE id = '%s'",
			mysql_real_escape_string($uid)
		);
		$result = getDBResultAffected($dbQuery);
		$dbQuery = sprintf("INSERT INTO friendlist (uid, fid) VALUES ('%s', '%s')",
			mysql_real_escape_string($uid),
			mysql_real_escape_string($fid)
		);
		$result = getDBResultInserted($dbQuery,'personId');
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Not in use
	 */
	function login($username, $password) {
		$dbQuery = sprintf("SELECT * FROM users WHERE username='%s' AND password='%s'",
			mysql_real_escape_string($username),
			mysql_real_escape_string($password)
		);
		$result = getDBResultRecord($dbQuery);
		if (is_null($result)) {
			echo 'Wrong username or password';
			return;
		}
		
		header("Content-type: application/json");
		echo json_encode($result);
	}

?>
