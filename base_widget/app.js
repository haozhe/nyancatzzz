//Define global variable storing the user_id for logged in user
var user_id = 3;
//Object to be passed into php functions
var data_obj = {};


$(document).ready(function() {

    //After #home-mine-page is created, execute the following to get a list of gripes 
    $("#home-page").bind("pagebeforecreate", function (event){
        $("#home_button").hide();

        bindFooter();
        bindBrosweNavbar();
        
        $("#mine-tab").trigger("click");
        
        $("#browse-nearby-tab").trigger("click");  
        
    });

    
    //For Browse-Nearby Page
    initializeMap();
    function initializeMap() {
        var mapOptions = {
            center: new google.maps.LatLng(33.7767873, -84.38872529999999),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("google-map"),
            mapOptions);
    }

    //For Browse-Search Page
    $("#browse-search-submit").click(function (){
        var keyword = $("#browse-search-keyword").val();
        getGripes({'key':'keyword', 'value': keyword}, "#search-gripe-list", "Search Results")
        $.mobile.changePage("#search-result-page");
    });

    //For Add New Gripe Page
    $("#gripetitle").change(function(){ 
        data_obj.gripe_title = $(this).val();
    });

    $("#gripedetail").change(function(){ 
        data_obj.gripe_description = $(this).val();
    });

    $('#upload_img').click(function() {

        $( "#popupLoadImg" ).dialog({ 
            'modal': true, 
            'width': 530, 
            'title': result.summary, 
            'resizable': false, 
            'draggable': false 
        });

    });

  
    $( "#geo_toggle" ).bind( "change", function(event, ui) {
        if($('select[name="geo_toggle"]').val()=="on"){
            //call geolocation stuff
            getLocation();    
        }; 
    });

    
    $('#submit_gripe').click(function() {
        data_obj.user_id = user_id;
        data_obj.anon = $('select[name="anon_select"]').val();      
        data_obj.serious = $('select[name="serious_select"]').val();
        data_obj.category_id = $('select[name="cat_select"]').val();
        if($('select[name="geo_toggle"]').val()=="on"){
            console.log(data_obj.latitude+" "+data_obj.longitude);

        }; 

        if(data_obj.category_id=="New"){
            alert("Implement create a new category");
        }

        if(data_obj.gripe_title==undefined){
            alert("You must specify a Gripe");
        }else{
            addGripe(data_obj);
            var li = '<li data-theme="c">';
            li += '<a href="#single-gripe-page" data-transition="slide">';
            li += data_obj.gripe_title;
            li += '<span class="ui-li-count">';
            li += 'unsolved';
            li += '</span>';
            li += '</a>';
            li += '</li>';
            $('#my-gripe-list li:first-child').after(li);
            $('#my-gripe-list').listview("refresh");
            $.mobile.changePage('#home-page')
        }
 
        return false;
    });
 
});


function getLocation()
{
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(setPosition);
    }
    else{
        alert("Geolocation is not supported by this browser.");
    }
}

function setPosition(position)
{
    data_obj.latitude = position.coords.latitude;
    data_obj.longitude = position.coords.longitude;
   
}
    


function getMineContent(){
    
}

function bindFooter(){
    
    $("#mine-tab").click(function () {
        $("#mine-content").show();
        $("#browse-content").hide();
        $("#profile-content").hide();
        
        $("#browse-navbar").hide();
        
        getGripes({
            'key':'user_id',
            'value':user_id
        },"#my-gripe-list", "My Gripes");
        
        
    });

    
    $("#browse-tab").click(function () {
        $("#mine-content").hide();
        $("#browse-content").show();
        $("#profile-content").hide();
        
        $("#browse-navbar").show();
    });
    
    $("#profile-tab").click(function () {
        $("#mine-content").hide();
        $("#browse-content").hide();
        $("#profile-content").show();
        
        $("#browse-navbar").hide();
    });    
    

}

function bindBrosweNavbar(){
    $("#browse-nearby-tab").click(function(){
        $("#browse-nearby-content").show();
        $("#browse-top-content").hide();
        $("#browse-search-content").hide();
    });

    $("#browse-top-tab").click(function(){
        $("#browse-nearby-content").hide();
        $("#browse-top-content").show();
        $("#browse-search-content").hide();
    });
    
    $("#browse-search-tab").click(function(){
        $("#browse-nearby-content").hide();
        $("#browse-top-content").hide();
        $("#browse-search-content").show();
    });
    

}
   
    
