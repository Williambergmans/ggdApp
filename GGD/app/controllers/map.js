/**
 * Instantiate the local variables for this controller
 */
var _args = arguments[0] || {}, // Any passed in arguments will fall into this property
    App = Alloy.Globals.App, // reference to the APP singleton object
    userLong,
    userLat,
    calamiteiten = null, // Array placeholder for all information
    indexes = [];
// Array placeholder for the ListView Index (used by iOS only);

if (!Titanium.Geolocation.hasLocationPermissions(Titanium.Geolocation.AUTHORIZATION_ALWAYS)) {
	Titanium.Geolocation.requestLocationPermissions(Titanium.Geolocation.AUTHORIZATION_ALWAYS, function(result) {
		if (!result.success) {
			//no location permissions flow triggers
		} else {
			//do something
		}
	});
}

_args.kilometer = Ti.App.Properties.getInt("kilometer");

if (_args.kilometer == null) {
	_args.kilometer = 1000;

}

function getLocation() {

	if (Ti.Network.online) {
		// Ti.Geolocation.purpose = "Receive User Location";
		Titanium.Geolocation.getCurrentPosition(function(e) {

			if (!e.success || e.error) {
				alert('Could not find the device location');
				return;
			}
			$.kaart.addEventListener("focus", function(e) {

				getMap();
			});

			userLong = e.coords.longitude;
			userLat = e.coords.latitude;
		});
	} else {
		alert("Er is een Internet connectie nodig om uw locatie te bepalen");
	}

}

getLocation();

function getMap() {

	var wrapperView = Ti.UI.createView();
	// Full screen
	var containerView = Ti.UI.createView({// Set height appropriately
		backgroundColor : '#FFF',
		top : 0
	}); userLong;userLat;
	kilometer = _args.kilometer;

	if (kilometer == 1000) {
		latDelta = 0.025;
		longDelta = 0.025;
	}
	if (kilometer == 5000) {
		latDelta = 0.12;
		longDelta = 0.12;
	}
	if (kilometer == 15000) {
		latDelta = 0.4;
		longDelta = 0.4;
	}
	if (kilometer == 25000) {
		latDelta = 0.6;
		longDelta = 0.6;
	}

	var Map = require('ti.map');
	var mapview = Map.createView({
		mapType : Map.NORMAL_TYPE,
		region : {
			latitude : userLat,
			longitude : userLong,
			latitudeDelta : latDelta,
			longitudeDelta : longDelta
		},
		animate : true,
		regionFit : true,
		userLocation : true,
		top : 0,
		bottom : 0
	});

	var dataArray = [];

	//We execute the function to show the data for the first view
	getCalamiteitData();

	var json;

	function getCalamiteitData() {
		//function to use HTTP to connect to a web server and transfer the data.
		var sendit = Ti.Network.createHTTPClient({
			onerror : function(e) {
				Ti.API.debug(e.error);
				alert('Er is iets fout gegaan tijdens het verbinden met de server');
			},
			// timeout:1000,
		});

		//Here you have to change it for your local ip
		sendit.open('GET', 'http://williambergmans.nl/ggd/public/calamiteitenJson');
		sendit.send();
		//Function to be called upon a successful response
		sendit.onload = function() {

			json = JSON.parse(this.responseText);
			json = json.calamiteiten;
			//if the database is empty show an alert
			if (json.length == 0) {
				alert() = "The database row is empty";
			}
			getAnnotations(json);

		};
	};

	function getAnnotations(calamiteiten) {
		var annotations = [];

		for (var i = 0; i < calamiteiten.length; i++) {

			var pin = Map.createAnnotation({
				latitude : calamiteiten[i].latitude,
				longitude : calamiteiten[i].longitude,
				customView : Alloy.createController("annotation", {
					image : calamiteiten[i].photo
				}).getView(),
				title : calamiteiten[i].calamiteitTitel,
				animate : true,
				myid : i,
			});

			annotations[i] = pin;

			mapview.addAnnotation(annotations[i]);
			// adds annotations

			_args.calamiteiten = calamiteiten;
			_args.annotations = annotations;

			var annotationId;

			/*

			 mapview.addEventListener('click', function(evt)
			 {
			 console.log('test');
			 if (clicksource ='leftButton'){

			 if(annotationId != evt.annotation.myid && evt.annotation.myid != undefined ){

			 annotationId = evt.annotation.myid;

			 //leftButton event
			 Alloy.Globals.Navigator.open("details",  _args.calamiteiten[evt.annotation.myid] ,{displayHomeAsUp:true});

			 }
			 }

			 });
			 */

		}
	}

	var circle = Map.createCircle({
		center : {
			latitude : userLat,
			longitude : userLong
		},
		radius : kilometer, //1km = 1000
		fillColor : "#8072D5FF",
		strokeColor : "#00FFFFFF",

	});
	mapview.addCircle(circle);
	containerView.add(mapview);
	wrapperView.add(containerView);
	$.kaart.add(wrapperView);
}

