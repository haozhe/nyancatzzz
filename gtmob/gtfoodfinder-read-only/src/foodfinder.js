
var db; // WebDB
var currentUser="Anonymous";
var currentFood;
var currentComt;
var currentTmpl;
var lookupUser;

$(window).bind('message', function( event ){
	console.log("Received Message");
	console.log(event.originalEvent.data);

	var request = jQuery.parseJSON(event.originalEvent.data);
	switch(request.type.toLowerCase()){
		case "event":
			switch(request.action.toLowerCase()){
				case "widgetpageshow":
					checkLoginStatus();
					loadWidgetIcons();
					break;
				case "widgetpagehide":
					break;
				default:
					console.log("Unknown Action "+request.action);
					break;
			}
			break;
		default:
			console.log("Unknown Type "+request.type);
			break;
	}
});


function checkLoginStatus(){
	$.ajax({
		url: "/user",
		async: true,
		success: function(data, textStatus, jqXHR) {
			//console.log('logged in as '+data);
			$.ajax({
				url: "../../api/foodfinder/client",
				type: 'POST',
				data: {'uid': data},
				success: function(ret) {
					currentUser = data;
					$('#login').hide();
					console.log("current user " + currentUser);
				}
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('user not logged in');
			currentUser = "Anonymous";
			$('#logout').hide();
		}
	});
}


function loginLogoutHandler(){
	if($("#login_button").hasClass('loggedin')){
		window.location.href = "/logout/"+window.location.href;
	}else{
		window.location.href = "/login/"+window.location.href;
	}
}

$(function() {
	// Handler for .ready() called.
	console.log('ready');
	
	//Bind click handler for login and logout
	$("#login_button").bind("click", loginLogoutHandler);
	
	checkLoginStatus();
	
	init();
});

function initDB() {
    try {
        if (!window.openDatabase) {
            throw 'Web SQL databases are not supported by this browser.';
        } else {
            var tableName = "foodfinder";
            var version = "1.0";
            var displayName = "Stores the list of Foods";
            var maxSize = 65536;
            
            db = openDatabase(tableName, version, displayName, maxSize);
            createTableMeals();
        }
    } catch (e) {
    }
}

function createTableMeals() {
    db.transaction(function(tx) {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS meals (id NOT NULL, ingredients, name, picture, price, star1, star2, star3, star4, star5, PRIMARY KEY (id))',
            [], 
            function(tx, results) {
                //$.mobile.showPageLoadingMsg();
				tx.executeSql(
					'SELECT COUNT(*) as recordCount From meals',
					[],
					function(tx, results) {
						var recordCount = results.rows.item(0)["recordCount"];
						if (recordCount != 0) {
							deleteTableMeals();
						} else {
							insertAllMeals();
						}
					}
				);
				
                console.log("[INFO][createTableMeals] Creating table meals");
                testDB();
            },
            function(tx, err) { // handle create table errors 
                console.log(err);
            }
        );
    });

}

function getFoodDetails(callback) {
	$.ajax({
        url: "../../api/foodfinder/bookmark/1",
		data: {"mid": currentFood, "uid": currentUser},
		success: function(ret) {
			var data = jQuery.parseJSON(ret);
			console.log("bookmark" + data[0]);
			if (data[0] == null) {
				$('#bookmarkit').show();
				$('#unbookmarkit').hide();
				console.log("show bookmark hide unbookmark");
			} else {
				$('#bookmarkit').hide();
				$('#unbookmarkit').show();
				console.log("hide bookmark show unbookmark");
			}
			console.log("getFoodDetails");
			var query = "SELECT * FROM meals WHERE id = ?";
			var queryParams = [currentFood];
			db.transaction(function(tx) {
				tx.executeSql(query, queryParams, function(tx, results) {
					callback(results.rows);
				});
			});
		}
	});
    
}

function commentDetailClick(cid, uid, commentText) {
	currentComt = cid;
	lookupUser = uid;
	console.log("current comment " + currentComt);
	console.log("current lookup user " + lookupUser);
	console.log("comment " + commentText);
	$("#commentDialogDetail").empty();
	templateRow = {};
	templateRow.uid = uid;
	templateRow.commentText = commentText;
	$("#commentDetailDialogTemplate").tmpl(templateRow).appendTo("#commentDialogDetail");
	console.log("done");
}

function checkoutProfile() {
	templateRow = {};
	$.ajax({ // Get User Basic Info
		url: "../../api/foodfinder/client/" + lookupUser,
		success: function(data) {
			//console.log("new user " + data);
			if (data == "null") {
				console.log("data == null");
				templateRow.uid = lookupUser;
				templateRow.userImg = "../pic/user/4.jpg";
				templateRow.numOfFriends = 0;
				templateRow.numOfReviews = 0;
				$("#profileTemplate").tmpl(templateRow).appendTo("#profileDetail");
				$("#profileDetail").listview('refresh');
			} else {
				var list = jQuery.parseJSON(data);
				$("#user_comment_no_results_message").hide();
				if (list.length > 0) {
					var row = list[0];
					//alert(row);
					$("#profileDetail").empty();
					templateRow.uid = row.uid;
					templateRow.userImg = row.userImg;
					templateRow.numOfFriends = row.numOfFriends;
					templateRow.numOfReviews = list.length;
					$("#profileTemplate").tmpl(templateRow).appendTo("#profileDetail");
					$("#profileDetail").listview('refresh');
					templateComment = {};
					$("#userCommentsList").empty();
					for (var i=0; i<list.length; ++i) {
						var item = list[i];
						templateComment.foodImg = item.foodImg;
						templateComment.foodName = item.foodName;
						templateComment.commentText = item.comment;
						templateComment.helpful = item.helpful;
						$("#userCommentTemplate").tmpl(templateComment).appendTo("#userCommentsList");
						$("#userCommentsList").listview('refresh');
					}
				} else {
					$("#user_comment_no_results_message").show();
				}
			}
  		}
	});
}

function getCommentsOnFood() {
    console.log("getCommentsOnFood " + currentFood);
    $.ajax({
        url: "../../api/foodfinder/meal/" + currentFood + "/comment",
        context: document.body,
        success: function(data){
            $("#commentList").empty();
			//alert("get comment " + data);
            var list = jQuery.parseJSON(data);
            templateRow = {};
			//console.log("empty comment list");
            $("#comment_no_results_message").hide();
            if (list.length > 0) {
                var row = null;
				$("#commentList").empty();
                for (var i=0; i<list.length; ++i) {
                    row = list[i];
					//alert(list[i].uid);
                    templateRow.uid = row.uid;
                    templateRow.picture = row.picture;
                    templateRow.commentID = row.cid;
                    templateRow.timestamp = row.timestamp;
                    templateRow.helpful = row.helpful;
                    templateRow.commentText = row.comment;
                    $("#foodCommentTemplate").tmpl(templateRow).appendTo("#commentList");
                    $("#commentList").listview('refresh');
                }
            } else {
                $("#comment_no_results_message").show();
            }
		}
	});
}

function addBookmark() {
	$('#bookmarkit').hide();
	$('#unbookmarkit').show();
	editBookmark('add');
}

function removeBookmark() {
	$('#bookmarkit').show();
	$('#unbookmarkit').hide();
	editBookmark('remove');
}

function editBookmark(option) {
	console.log(currentUser + " " + option + " " + currentFood);
	$.ajax({
        url: "../../api/foodfinder/bookmark",
        context: document.body,
		type: 'POST',
		data: {'option': option, 'mid': currentFood, 'uid': currentUser},
        success: function(data){
            console.log(option + data);
		}
	});
}

function draftReview() {
    //Bind the add page button
    console.log("current food: " + currentFood);
    $('#addButton').bind('click', function() {
		stars = $('#ratingMenu').val();
		// update local db first
		if (db) {
			db.transaction(function(tx) {
				tx.executeSql(
					"UPDATE meals SET " + stars + " = " + stars + " + 1 where id = ?",
					[currentFood],
					function(tx, results) {
						console.log("increased " + stars);
					},
					function(tx, error) {
						console.log(error);
					}
				)
			});
		}
		$.ajax({
            url: "../../api/foodfinder/comment",
            dataType: "json",
            async: false,
            context: document.body,
            data: {'rating': stars, 'commentText':$('#textarea')[0].value, 'mid':currentFood, 'uid':currentUser},
            type: 'POST',
            success: function(data) {
				console.log("return data " + data);
                id = data.CommentId;
				console.log(currentUser + " posted " + id);
                $.ajax({
                    url: "../../api/foodfinder/comment/" + id,
                    context: document.body,
                    success: function(data) {
                        templateRow = {};
                        var row = jQuery.parseJSON(data);
                        if (row) {
                            templateRow.uid = row.uid;
                            templateRow.picture = row.picture;
                            templateRow.cid = row.cid;
                            templateRow.timestamp = row.timestamp;
                            templateRow.helpful = row.helpful;
                            templateRow.commentText = row.comment;
                            $("#foodCommentTemplate").tmpl(templateRow).appendTo("#commentList");
							//$("#commentList").listview('refresh');
							$("#comment_no_results_message").hide();
                        }
                    }
                });
            }
        });
    });
    
    //library.changeLinksForOffline();
}

function foodDetailClick(FID) {
	currentFood = FID;
	console.log("current food " + currentFood);
    getFoodDetails(populateFoodInfo);
}

function populateFoodInfo(rows) {
    $("#foodDetailInfo").empty();
    if (rows.length > 0) {
        templateRow = {};
        var row = rows.item(0);
		//alert(row);
        templateRow.foodID = row.id;
        templateRow.foodName = row.name;
        templateRow.foodPrice = row.price;
        templateRow.foodImg = row.picture;
        templateRow.foodIng = row.ingredients;
		ns1 = parseInt(row.star1);
		ns2 = parseInt(row.star2);
		ns3 = parseInt(row.star3);
		ns4 = parseInt(row.star4);
		ns5 = parseInt(row.star5);
		templateRow.reviews = ns1 + ns2 + ns3 + ns4 + ns5;
		if (templateRow.reviews == 0) templateRow.rating = 0;
		else templateRow.rating = Math.round((ns1 + ns2*2 + ns3*3 + ns4*4 + ns5*5) * 100 / templateRow.reviews) / 100;
		console.log("ingredient " + templateRow.foodIng);
        $("#foodInfoTemplate").tmpl(templateRow).appendTo("#foodDetailInfo");
    }
}

function insertAllMeals() {
    $.ajax({
        url: "../../api/foodfinder/meal",
        context: document.body,
        success: function(data) {
            var list = jQuery.parseJSON(data);
            for (var i=0; i<list.length; ++i) {
                food = list[i];
                var insertFunc = function(food, currentIdx, maxIdx) {
                    return function(tx) {
                        tx.executeSql(
                            "INSERT INTO meals VALUES(?,?,?,?,?,?,?,?,?,?)",
                            [
                                food["id"],
                                food["ingredients"],
                                food["name"],
                                food["picture"],
                                food["price"],
                                food["star1"],
                                food["star2"],
                                food["star3"],
                                food["star4"],
                                food["star5"]
                            ],
                            function(tx, results) {
                                console.log("inserted " + food["name"] + " " + food["price"]);
                            },
                            function(tx, err) { // handle create table errors 
                                console.log(err);
                            }
                        );
                    }
                }(food, i, list.length - 1);
                db.transaction(insertFunc);
            }
        }
    });
}

function commentHelpful() {
	$.ajax({
		url: "../../api/foodfinder/comment/" + currentComt + "/helpful",
		context: document.body,
		success: function(data) {
			//console.log("");
		}
    });
}

function listAllMeals() {
    if (db) {
        //alert("listAllMeals");
        db.transaction(function (tx) {
            tx.executeSql(
                "SELECT id,name,price,picture,star1,star2,star3,star4,star5 FROM meals",
                [],
                function(tx, results) {
                    templateRow = {};
                    $("#searchResultsList").empty();
                    $("#food_no_results_message").hide();
                    var list = results.rows;
                    if (list.length > 0) {
                        var row = null;
                        for (var i=0; i<list.length; ++i) {
                            row = list.item(i);
                            //alert(list.item(i));
                            templateRow.foodID = row.id;
                            templateRow.foodName = row.name;
                            templateRow.foodPrice = row.price;
                            templateRow.foodImg = row.picture;
							ns1 = parseInt(row.star1);
							ns2 = parseInt(row.star2);
							ns3 = parseInt(row.star3);
							ns4 = parseInt(row.star4);
							ns5 = parseInt(row.star5);
							templateRow.reviews = ns1 + ns2 + ns3 + ns4 + ns5;
							if (templateRow.reviews == 0) templateRow.rating = 0;
							else templateRow.rating = Math.round((ns1 + ns2*2 + ns3*3 + ns4*4 + ns5*5) * 10 / templateRow.reviews) / 10;
                            $("#foodListTemplate").tmpl(templateRow).appendTo("#searchResultsList");
                            $("#searchResultsList").listview('refresh');
                        }  
                    } else {
                        $("#food_no_results_message").show();
                    }
                },
                function(tx, error) {
                    console.log(err);
                }
            ); 
        });
    }
}

function addFriend() {
	//alert("zouni");
	if (lookupUser == currentUser) return;
	$.ajax({
		url: "../../api/foodfinder/client/" + currentUser + "/friends",
		data: {'friend': lookupUser},
		type: 'POST',
		success: function(data) {
			console.log(currentUser + " added " + lookupUser);
		}
	});
}

function prepareAboutme() {
	templateRow = {};
	$.ajax({ // Get Basic Info
		url: "../../api/foodfinder/client/" + currentUser,
		success: function(data) {
			var list = jQuery.parseJSON(data);
			console.log(data);
			$("#aboutmeDetail").empty();
			if (data == "null") {
				console.log("data == null");
				templateRow.uid = currentUser;
				templateRow.userImg = "../pic/user/4.jpg";
				templateRow.numOfFriends = 0;
				templateRow.numOfReviews = 0;
				$("#aboutmeTemplate").tmpl(templateRow).appendTo("#aboutmeDetail");
				$("#aboutmeDetail").listview('refresh');
			} else {
				if (list.length > 0) {
					var row = list[0];
					//alert(row);
					$("#aboutmeDetail").empty();
					templateRow.uid = row.uid;
					templateRow.userImg = row.userImg;
					templateRow.numOfFriends = row.numOfFriends;
					templateRow.numOfReviews = list.length;
					templateRow.fid = row.fid;
					templateRow.cid = row.cid;
					$("#aboutmeTemplate").tmpl(templateRow).appendTo("#aboutmeDetail");
					$("#aboutmeDetail").listview('refresh');
				}
			}
  		}
	});
}

function getFriendInfo(fid) {
	lookupUser = fid;
	checkoutProfile();
}

function prepareComments() {
	$.ajax({ // Get User Basic Info
		url: "../../api/foodfinder/client/" + currentUser,
		success: function(data) {
			if (data == "null") {
				return;
			}
			var list = jQuery.parseJSON(data);
			$("#aboutme_comment_no_results_message").hide();
			if (list.length > 0) {
				templateComment = {};
				$("#aboutmeCommentsList").empty();
				for (var i=0; i<list.length; ++i) {
					var item = list[i];
					templateComment.foodImg = item.foodImg;
					templateComment.foodName = item.foodName;
					templateComment.commentText = item.comment;
					templateComment.helpful = item.helpful;
					$("#aboutmeCommentTemplate").tmpl(templateComment).appendTo("#aboutmeCommentsList");
                    $("#aboutmeCommentsList").listview('refresh');
				}
			} else {
				$("#aboutme_comment_no_results_message").show();
			}
  		}
	});
}

function prepareFriendList() {
	$.ajax({ // Get Basic Info
		url: "../../api/foodfinder/client/" + currentUser + "/friends",
		success: function(data) {
			if (data == "null") return;
            var list = jQuery.parseJSON(data);
            templateRow = {};
            $("#friendlist_no_results_message").hide();
            if (list.length > 0) {
				var row = null;
				$("#friendlistlist").empty();
                for (var i=0; i<list.length; ++i) {
                    row = list[i];
                    templateRow.fid = row.fid;
                    templateRow.friendImg = row.friendImg;
					templateRow.numOfFriends = row.numOfFriends;
                    $("#friendlistTemplate").tmpl(templateRow).appendTo("#friendlistlist");
                    $("#friendlistlist").listview('refresh');
                }
            } else {
                $("#friendlist_no_results_message").show();
            }

  		}
	});
}

function prepareBookmarks() {
	$.ajax({ // Get Basic Info
		url: "../../api/foodfinder/client/" + currentUser + "/bookmarks",
		success: function(data) {
			if (data == "null") {
				return;
			} 
			var list = jQuery.parseJSON(data);
            templateRow = {};
            $("#bookmark_no_results_message").hide();
            if (list.length > 0) {
				console.log("length of friendlist" + list.length);
                var row = null;
				$("#bookmarklist").empty();
                for (var i=0; i<list.length; ++i) {
                    row = list[i];
					templateRow.foodID = row.foodID;
					templateRow.foodName = row.foodName;
					templateRow.foodPrice = row.price;
					templateRow.foodImg = row.foodImg;
					ns1 = parseInt(row.star1);
					ns2 = parseInt(row.star2);
					ns3 = parseInt(row.star3);
					ns4 = parseInt(row.star4);
					ns5 = parseInt(row.star5);
					templateRow.reviews = ns1 + ns2 + ns3 + ns4 + ns5;
					if (templateRow.reviews == 0) templateRow.rating = 0;
					else templateRow.rating = Math.round((ns1 + ns2*2 + ns3*3 + ns4*4 + ns5*5) * 10 / templateRow.reviews) / 10;
					$("#bookmarkTemplate").tmpl(templateRow).appendTo("#bookmarklist");
					$("#bookmarklist").listview('refresh');
                }
            } else {
                $("#bookmark_no_results_message").show();
            }

  		}
	});
}

function deleteTableMeals() {
    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM meals", [], function(tx, results) {
            console.log("TABLE meal is clear!");
			insertAllMeals();
        });
    });
}


function testDB() {
    if (db) {
        db.transaction(function(tx) {
            tx.executeSql(
                "SELECT * FROM meals",
                [],
                function(tx, results) {
					console.log("Testing DB");
                    console.log(results.rows.length);
                    var list = results.rows;
                    var row = null;
                    for (var i=0; i<list.length; ++i) {
                        row = list.item(i);
                        console.log("id " + row.id + " name " + row.name + " price " + row.price);
                    }
                },
                function(tx, error) {
                    console.log(error);
                }
            )
        });
    }
}

function prepareHot() {
	templateRow = {};
	$.ajax({ // Get Basic Info
		url: "../../api/foodfinder/hot",
		success: function(data) {
			var list = jQuery.parseJSON(data);
			console.log("hot list size" + list.length);
			$("#hotlist").empty();
			for (var i=0; i<list.length; ++i) {
				var row = list[i];
				//alert(row);
				templateRow.foodID = row.id;
				templateRow.foodImg = row.picture;
				templateRow.foodName = row.name;
				templateRow.foodPrice = row.price;
				ns1 = parseInt(row.star1);
				ns2 = parseInt(row.star2);
				ns3 = parseInt(row.star3);
				ns4 = parseInt(row.star4);
				ns5 = parseInt(row.star5);
				templateRow.reviews = ns1 + ns2 + ns3 + ns4 + ns5;
				if (templateRow.reviews == 0) templateRow.rating = 0;
				else templateRow.rating = Math.round((ns1 + ns2*2 + ns3*3 + ns4*4 + ns5*5) * 10 / templateRow.reviews) / 10;
				$("#hotTemplate").tmpl(templateRow).appendTo("#hotlist");
				$("#hotlist").listview('refresh');
			}
  		}
	});
}

function initDiv() {
    $('#foodtoday').live('pagecreate',function(event){
        listAllMeals();
    });
	$('#foodReviews').live('pagebeforeshow', function(event) {
		getCommentsOnFood();
	});
	$('#aboutme').live('pagecreate', function(event){
		prepareAboutme();
	});
	$('#hot').live('pagecreate', function(event) {
		prepareHot();
	})
	
}

function init() {
	try {
        initDB();
        initDiv();
		return;
	} catch (err) {
		console.log(err);
	}
}

