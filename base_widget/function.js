

function simpleIndex(){
    $.ajax({
        url: "api/simple",
        context: document.body,
        success: function(data){
            $('#IndexResult').html(data);
        }
    });
}
function simpleGet(){
    $.ajax({
        url: "api/simple/testItemValue",
        context: document.body,
        success: function(data){
            $('#GetResult').html(data);
        }
    });
}
function simplePost(){
    $.ajax({
        url: "api/simple",
        data: {
            'itemValue': 'testItemValue'
        },
        context: document.body,
        type: 'POST',
        success: function(data){
            $('#PostResult').html(data);
        }
    });
}
function simplePut(){
    $.ajax({
        url: "api/simple/testItemValue",
        context: document.body,
        data: {
            'itemValue': 'testItemNewValue'
        },
        headers: {
            'X-HTTP-Method-Override': 'PUT'
        },
        type: 'POST',
        success: function(data){
            $('#PutResult').html(data);
        }
    });
}
function simpleDelete(){
    $.ajax({
        url: "api/simple/testItem",
        context: document.body,
        type: 'DELETE',
        success: function(data){
            $('#DeleteResult').html(data);
        }
    });
}

function getGripes(query, gripe_list_holder, gripe_list_title){
    var status = new Array();
    status[0] = "unsolved";
    status[1] = "pending";
    status[2] = "solved";

    
    $.ajax({
        url: "api/gripe",
        context: document.body,
        type:"GET",
        data:query,
        success: function (data){
            alert(data);
            
            //Append gripe list title
            var title = '<li data-role="list-divider">' + gripe_list_title + '</li>';
            $(gripe_list_holder).append(title);
            //            console.log(title);
            
            var gripes = jQuery.parseJSON(data);

            $.each(gripes, function (i, gripe){
                //                console.log(status[gripe.status]);
                var li = '<li data-theme="c">';
                li += '<a data-transition="slide" onclick="getGripe('+gripe.gripe_id+')">';
                li += gripe.gripe_title;
                li += '<span class="ui-li-count">';
                li += status[gripe.status];
                li += '</span>';
                li += '</a>';
                li += '</li>';
                $(gripe_list_holder).append(li);

            });
            $(gripe_list_holder).listview("refresh");

        }
            
    });
    
}

function getGripe(gripe_id){

    $.ajax({
        url: "api/gripe/"+ gripe_id,
        context: document.body,
        success: function (data){
            console.log(data);

            var gripe = $.parseJSON(data);
            
            $("#single-gripe-title").html(gripe.gripe_title);
            $("#single-gripe-description").html(gripe.gripe_description);
            $("#single-gripe-user-name").html(gripe.Facebook_username);
            $("#single-gripe-user-img").attr('src',gripe.img_url);
            $.mobile.changePage("#single-gripe-page");
            
        }
            
    });
    
}

function addGripe(data_obj){      
    $.ajax({
        url: "api/gripe",
        context: document.body,
        type:"POST",
        data: data_obj,
        success: function (data){
            console.log(data+"was added");    
        }
            
    });
    
}

function updateGripe(gripe_id, input){
    console.log(input);
    $.ajax({
        url:"api/gripe/" + gripe_id,
        context:document.body,
        type:"PUT",
        data:input,
        success: function (data) {
            console.log(data);    
        }

    });
    
}

//APIs for User

function getUsers(query){
    $.ajax({
        url: "api/user",
        context: document.body,
        type:"GET",
        data:query,
        success: function (data){
            console.log(data);    
        }
            
    });
    
}

function getUser(user_id){
    $.ajax({
        url: "api/user/" + user_id,
        context: document.body,
        success: function (data){
            console.log(data);
        }
            
    });
    
}

function updateUser(user_id, input){
    console.log(input);
    $.ajax({
        url:"api/user/" + user_id,
        context:document.body,
        type:"PUT",
        data:input,
        success: function (data) {
            console.log(data);    
        }
    });
    
}

//APIs for report
function manageReport(query){
    $.ajax({
        url:"api/report",
        context:document.body,
        type:"GET",
        data:query,
        success:function (data){
            console.log(data)
            
        }
        
    });
    
}


