<?php
	include_once 'db_helper.php';
	
	/*
	 * List all meals with their basic information including names, pictures, prices
	 * @return A json object with all meals
	 */
	function listMeals() {
		$dbQuery = sprintf("SELECT * FROM meals");
		$result = getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Get detail information of a specific food
	 * @param $id - Food id
	 * @return A json object includes food name, price, picture, reviews, rating.
	 */
	function getMeal($id) {
		$dbQuery = sprintf("SELECT * FROM meals WHERE id = '%s'",
			mysql_real_escape_string($id));
		$result=getDBResultRecord($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Not in use
	 */
	function addRating($id, $rating) {
		$dbQuery = sprintf("UPDATE meals SET %s = %s + 1 WHERE id = '%s'",
			mysql_real_escape_string($rating),
			mysql_real_escape_string($rating),
			mysql_real_escape_string($id)
			);
		$result = getDBResultAffected($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * List all bookmarks of a user
	 * @param $uid - user id
	 * @return A json object with users bookmark list
	 */
	function listBookmarks($uid) {
		$dbQuery = sprintf("SELECT meals.id AS foodID, meals.picture AS foodImg, meals.name AS foodName, price, star1, star2, star3, star4, star5 FROM userbookmark, meals WHERE uid='%s' AND meals.id=userbookmark.mid AND userbookmark.disabled=false",
			mysql_real_escape_string($uid));
		$result = getDBResultsArray($dbQuery);
		echo json_encode($result);
	}
	
	/*
	 * Check if user has already bookmarked a food
	 * @param $bmrkid - a dummy id
	 * @param mid - Food id
	 * @param uid - user id
	 * @return null if user hasn't bookmarked the food yet; 1 if user has already bookmarked it
	 */
	function getBookmark($bmrkid, $mid, $uid) {
		$dbQuery = sprintf("SELECT COUNT(*) FROM userbookmark WHERE uid='%s' AND mid='%s' AND disabled=false",
			mysql_real_escape_string($uid),
			mysql_real_escape_string($mid)
		);
		$result = getDBResultRecord($dbQuery);
		if ($result['COUNT(*)'] == 0) {
			$ret = array(null);
			echo json_encode($ret);
		} else {
			$ret = array(1);
			echo json_encode($ret);
		}
	}
	
	/*
	 * Either add or remove a bookmark
	 * @param $option - "add" or "remove", case insensitive
	 * @param $mid - Food id
	 * @param $uid - user id
	 */
	function editBookmark($option, $mid, $uid) {
		if ($option == "add") {
			addBookmark($mid, $uid);
			return;
		} elseif ($option == "remove") {
			removeBookmark($mid, $uid);
			return;
		}
		echo "unknown option";
	}
	
	/*
	 * Add a bookmark on a specific food `mid`, called by editBookmark($$$)
	 * @param $mid - Food id
	 * @param $uid - user id
	 */
	function addBookmark($mid, $uid) {
		$dbQuery = sprintf("SELECT COUNT(*) FROM userbookmark WHERE uid='%s' AND mid='%s' AND disabled=true",
			mysql_real_escape_string($uid),
			mysql_real_escape_string($mid)
		);
		$result = getDBResultRecord($dbQuery);
		if ($result['COUNT(*)'] != 0) {
			$dbQuery = sprintf("UPDATE userbookmark SET disabled = false WHERE uid='%s' AND mid='%s'",
				mysql_real_escape_string($uid),
				mysql_real_escape_string($mid));
			$result = getDBResultAffected($dbQuery);
		} else {
			$dbQuery = sprintf("INSERT INTO userbookmark (uid, mid) VALUES ('%s', '%s')",
				mysql_real_escape_string($uid),
				mysql_real_escape_string($mid));
			$result = getDBResultInserted($dbQuery);
		}	
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Remove the bookmark on a specific food, called by editBookmark($$$)
	 * @param $mid - Food id
	 * @param $uid - user id
	 */
	function removeBookmark($mid, $uid) {
		$dbQuery = sprintf("UPDATE userbookmark SET disabled = true WHERE uid='%s' AND mid='%s'",
				mysql_real_escape_string($uid),
				mysql_real_escape_string($mid));
		$result = getDBResultAffected($dbQuery);
		
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * List all hot food
	 * @return A list of hot food
	 */
	function hotFoodList() {
		$dbQuery = sprintf("SELECT * FROM `meals` WHERE star1+star2+star3+star4+star5 > 0 ORDER BY (star1 * 1+star2 * 2+star3 * 3+star4 * 4+star5 * 5)/(star1+star2+star3+star4+star5) DESC LIMIT 5");
		$result = getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Not in use
	 */
	function recommandList() {
		$dbQuery = sprintf("SELECT * FROM `recommand`");
		$result = getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
?>
