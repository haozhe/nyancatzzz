 var map;
// initialize the google Maps   
function initializeGoogleMap() {
	// set latitude and longitude to center the map around
	var latlng = new google.maps.LatLng(33.777720,-84.397531);
                
	// set up the default options
	var myOptions = {
		zoom: 15,
		center: latlng,
		navigationControl: true,
		navigationControlOptions: {
			style: google.maps.NavigationControlStyle.DEFAULT,
			position: google.maps.ControlPosition.TOP_LEFT },
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DEFAULT,
			position: google.maps.ControlPosition.TOP_RIGHT },

		scaleControl: true,
		scaleControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_LEFT
		}, 
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		draggable: true,
		disableDoubleClickZoom: false,
		keyboardShortcuts: true
	};
	map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);
}
function newTorch(title){
	console.log("lat " + map.getCenter().lat() + " lon: " + map.getCenter().lng());
	addMarker(map, map.getCenter().lat(), map.getCenter().lng(), title);
}
          
// Add a marker to the map at specified latitude and longitude with tooltip
function addMarker(map,lat,long,titleText) {
	var markerLatlng = new google.maps.LatLng(lat,long);
	var marker = new google.maps.Marker({
		position: markerLatlng, 
		map: map, 
		title:titleText,
		icon: ""
	});
                
	var contentString = '<h3>Dining Hall1</h3> \n <p>Got Route</p>';
                        
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});     
                        
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}