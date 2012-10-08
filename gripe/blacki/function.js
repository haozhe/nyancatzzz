

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

//APIs for Gripe
//get a list of grips and append them to gripe_list_holder

//Blacki to Stan: Todo implement recent first

function getGripes(query, gripe_list_holder){
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
//            alert(status[0]);
            //alert(data);
            var gripes = jQuery.parseJSON(data);

            $.each(gripes, function (i, gripe){
                //                alert(status[gripe.status]);
                var li = '<li data-theme="c">';
                li += '<a href="#single-gripe-page" data-transition="slide">';
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
    gripe_id=1;
    $.ajax({
        url: "api/gripe/"+ gripe_id,
        context: document.body,
        success: function (data){
            alert(data);
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
            alert(data);    
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
            alert(data);    
        }
            
    });
    
}

function getUser(user_id){
    $.ajax({
        url: "api/user/" + user_id,
        context: document.body,
        success: function (data){
            alert(data);
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
            alert(data);    
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
            alert(data)
            
        }
        
    });
    
}