

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
            console.log(data);
            
            $(gripe_list_holder).html("");
            
            if(data !== "null"){
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
            } else {
                console.log("No gripe found");
                $(gripe_list_holder).append('<li data-role="list-divider">No Gripe Found</li>');

            }
            
            $(gripe_list_holder).listview("refresh");

        }
            
    });
    
}

function getGripe(gripe_id){
    
    var mapCanvas = '<div id="map_canvas" style="height:200px;"> </div>';
    $(mapCanvas).appendTo('#single-gripe-page div:last-child').css('opacity', 0).delay(600).animate({'opacity':'1'}, 'slow');

    $.ajax({
        url: "api/gripe/"+ gripe_id,
        context: document.body,
        success: function (data){
            console.log(data);

            var gripe = $.parseJSON(data);
            
            setGripePage("#single-gripe", gripe);

            $.mobile.changePage("#single-gripe-page");

            loadMap(new google.maps.LatLng(gripe.latitude,gripe.longitude));    


            $("#single-gripe-page").live("pageshow", function (){
        
                $("#map_canvas").gmap('refresh');

            });
        }
            
    });
    
}


function loadMap(location) {
    $('#map_canvas').gmap({
        'center': location, 
        'zoom': 14, 
        'disableDefaultUI':true,
        'noClear':false,
        'callback': function() {
            var self = this;
            self.addMarker({
                'position': this.get('map').getCenter()
            });
            self.refresh();
        }
    }); 

}

function initMultMap(query) {
    $.ajax({
        url: "api/gripe",
        context: document.body,
        type:"GET",
        data:query,
        success: function (data){
            console.log(data);
                        
            if(data !== "null"){
                //Append gripe list title            
                var gripes = jQuery.parseJSON(data);
                loadMultipleMap(gripes);
                
            } else {
                console.log("No gripes found");

            }
            
        }
            
    });
}

function loadMultipleMap(local) {
    $('#google-map').remove();
    var googleMap = '<div id ="google-map" style="width:99%; height:300px "></div>';
    $(googleMap).appendTo('#browse-nearby-content').css('opacity', 0).delay(300).animate({'opacity':'1'}, 'slow');


    // alert(local);
    $('#google-map').gmap({
        'center': '33.776579,-84.395355', 
        'zoom': 14, 
        'disableDefaultUI':true, 
        'callback': function() {
            var self = this;
            $.each(local, function(i,gripe){
                
                self.addMarker({
                    'position':  new google.maps.LatLng(gripe.latitude,gripe.longitude),
                    'bounds': true 
                }).click(function() {
                    $.mobile.changePage('#single-gripe-popup',{
                        role:'dialog'
                    });
                                
                    setGripePage('#single-gripe-popup', gripe);
                    

                });
            });
        }
    }); 
    
    $('#home-page').live('pageshow', function() {
        $('#google-map').gmap('refresh');
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
function checkUser(data_obj){
    $.ajax({
        url: "api/user/",
        context: document.body,
        type:"POST",
        data:data_obj,        
        success: function (data){
            console.log("Hello"+data);
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

function setGripePage(page,gripe){
    $(page + "-description").hide();
    
    $(page + "-title").html(gripe.gripe_title);
    if(gripe.gripe_description != "")$(page + "-description").html(gripe.gripe_description).show();
    $(page + "-user-name").html(gripe.username);
    $(page + "-user-img").attr('src',gripe.img_url);
    
}

function getTopGripes(){
    
    
}