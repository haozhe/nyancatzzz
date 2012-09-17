<?php
	include_once 'db_helper.php';
	/*
	 * Not in use
	 * List all dining halls 
	 * @return A json object with all dining halls, including their positions, etc.
	 */
	function listDiningHalls() {
		$dbQuery = sprintf("SELECT * FROM dininghall");
		$result = getDBResultsArray($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
	
	/*
	 * Not in use
	 */
	function getDiningHall($id) {
		$dbQuery = sprintf("SELECT * FROM dininghall WHERE id = '%s'",
			mysql_real_escape_string($id));
		$result=getDBResultRecord($dbQuery);
		header("Content-type: application/json");
		echo json_encode($result);
	}
?>
