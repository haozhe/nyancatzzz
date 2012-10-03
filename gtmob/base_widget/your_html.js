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
function getGripes(query){
    $.ajax({
        url: "api/gripe",
        context: document.body,
        type:"GET",
        data:query,
        success: function (data){
            alert(data);    
        }
            
    });
    
}

function getGripe(gripe_id){
    gripe_id = 1;
    $.ajax({
        url: "api/gripe/" + gripe_id,
        context: document.body,
        success: function (data){
            alert(data);
        }
            
    });
    
}

function addGripe(input){
    $.ajax({
        url: "api/gripe",
        context: document.body,
        type:"POST",
        data: input,
        success: function (data){
            alert(data);    
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


//Stan to Blacki: you should implement js function calls to call all apis below, they are just like the functions above
//necessary data is in the api doc
//remember to change type according to the input type in the api doc
//url is also in the api doc