//Define global variable storing the user_id for logged in user
var user_id = 3;
//Object to be passed into php functions
var data_obj = {};


$(document).ready(function() {
    
    
    //After #home-mine-page is created, execute the following to get a list of gripes 
    $("#home-page").bind("pagebeforecreate", function (event){
        bindFooter();
        bindBrosweNavbar();
        
        $("#home_button").hide();
    });
    
    initializeMap();
    
    //Bind footer
    //bindFooter();

    //Bind browse navbar
    //bindBrosweNavbar();

    $("#gripetitle").change(function(){ 
        data_obj.gripe_title = $(this).val();
    });

    $("#gripedetail").change(function(){ 
        data_obj.gripe_description = $(this).val();
    });

    $('#upload_img').click(function() {
        alert("Implement upload popup")

    // $( "#popupLoadImg" ).popup( "open" );

    });

    // $('#upload_img').bind({
    //    popupbeforeposition: function(event, ui) { ... }
    // });



    $( "#geo_toggle" ).bind( "change", function(event, ui) {
        if($('select[name="geo_toggle"]').val()=="on"){
            //call geolocation stuff
            alert("Launch geolocation");
    
        }; 
    });


    // $( '#geo_toggle').on( 'slidestop', function( event ) { 
    //     if($('select[name="geo_toggle"]').val()=="on"){
    //         //call geolocation stuff
    //         alert("Launch geolocation");
            
    //     };
    // });

    // if($('select[name="geo_toggle"]').val()=="on"){
    //   //call geolocation stuff
    //   alert("Launch geolocation");

    // }; 



    $('#submit_gripe').click(function() {
        data_obj.user_id = user_id;
        data_obj.anon = $('select[name="anon_select"]').val();      
        data_obj.serious = $('select[name="serious_select"]').val();
        data_obj.category_id = $('select[name="cat_select"]').val();
        if($('select[name="geo_toggle"]').val()=="on"){
            alert("Launch geolocation");

        }; 

        // console.log("category"+data_obj.category_id);
        if(data_obj.category_id=="New"){
            alert("Implement create a new category");
        }

        if(data_obj.gripe_title==undefined){
            alert("You must specify a Gripe");
        }else{
            addGripe(data_obj);
        }

        var li = '<li data-theme="c">';
        li += '<a href="#single-gripe-page" data-transition="slide">';
        li += data_obj.gripe_title;
        li += '<span class="ui-li-count">';
        li += 'unsolved';
        li += '</span>';
        li += '</a>';
        li += '</li>';

        $('#my-gripe-list li:first-child').after(li);
        // $('#my-gripe-list li:first-child').after(li).listview("refresh");
        $('#my-gripe-list').listview("refresh");

        $.mobile.changePage('#home-mine-page')
        return false;
    });
 
});



function getMineContent(){
    
}

function bindFooter(){
    
    $("#mine-tab").click(function () {
        $("#mine-content").show();
        $("#browse-content").hide();
        $("#profile-content").hide();
        
        $("#browse-navbar").hide();
        
        getGripes({
            'u':user_id
        },"#my-gripe-list", "My Gripes");
        
        
    });
    
    $("#mine-tab").click();
    
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
    
    $("#browse-nearby-tab").click();
}
//Stan to Blacki: you should implement js function calls to call all apis below, they are just like the functions above
//necessary data is in the api doc
//remember to change type according to the input type in the api doc
//url is also in the api doc
    
    
    
function initializeMap() {
    var mapOptions = {
        center: new google.maps.LatLng(-34.397, 150.644),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("google-map"),
        mapOptions);
}