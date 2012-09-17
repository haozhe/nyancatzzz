<?php
	include 'db_helper.php';
	
	/*
	 * List all comments of a specific food
	 * @param $mid - Food ID
	 * @return A json object listing all comments
	 */
	function listComments($mid) {
		$dbQuery = sprintf("SELECT users.id AS uid, picture, comments.id as cid, timestamp, helpful, comment FROM `users`,`comments` WHERE comments.uid=users.id AND comments.mid='%s' ORDER BY helpful DESC, timestamp DESC",
			mysql_real_escape_string($mid));
		$result = getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Get a specific comment based on comment id
	 * @param $id - Comment id
	 * @return A json object with comment's info including owner, time, content, etc.
	 */
	function getComment($id) {
		$dbQuery = sprintf("SELECT users.id AS uid, picture, comments.id AS cid, timestamp, helpful, comment FROM `comments`, `users` WHERE comments.uid=users.id AND comments.id = '%s'",
			mysql_real_escape_string($id));
		$result=getDBResultRecord($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Post a new comment
	 * @param $rating - star1 or star2 or star3 or star4 or star5
	 * @param $comment - comment content
	 * @param $mid - food id
	 * @param $uid - user id
	 * @return A json object: {CommentId: id}
	 */
	function addComment($rating, $comment, $mid, $uid) {
		$dbQuery = sprintf("UPDATE meals SET %s = %s + 1 WHERE id = %s",
			mysql_real_escape_string($rating),
			mysql_real_escape_string($rating),
			mysql_real_escape_string($mid));
		$result = getDBResultAffected($dbQuery);
		$dbQuery = sprintf("INSERT INTO comments (comment, mid, uid, timestamp) VALUES ('%s', '%s', '%s', LOCALTIMESTAMP())",
			mysql_real_escape_string($comment),
			mysql_real_escape_string($mid),
			mysql_real_escape_string($uid));
		$result = getDBResultInserted($dbQuery,'CommentId');
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Not in use
	 */
	function updateComment($id,$comment) {
		$dbQuery = sprintf("UPDATE comments SET comment = '%s' WHERE id = '%s'",
			mysql_real_escape_string($comment),
			mysql_real_escape_string($id));
		
		$result = getDBResultAffected($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Not in use
	 */
	function deleteComment($id) {
		$dbQuery = sprintf("DELETE FROM comments WHERE id = '%s'",
			mysql_real_escape_string($id));												
		$result = getDBResultAffected($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Plus one ishelpful on a given comment
	 * @param $cid - comment id
	 */
	function isHelpful($cid) {
		$dbQuery = sprintf("UPDATE comments SET helpful = helpful + 1 WHERE id = '%s'",
			mysql_real_escape_string($cid));
		
		$result = getDBResultAffected($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
?>
