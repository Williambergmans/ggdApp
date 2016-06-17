/**
 * Instantiate the local variables for this controller
 */
var _args = arguments[0] || {}, // Any passed in arguments will fall into this property
    rapTitle = null, //
    rapDate = null, //
    rapInhoud = null, //
    rapLatitude = null,
    rapLongitude = null,
    rapMail = null,
    rapPhone = null;

var rapTitle = _args.rapTitle;
var rapDate = _args.rapDate;
var rapCat = _args.rapCat;
var rapInhoud = _args.rapInhoud;
var rapLongitude = _args.rapLongitude;
var rapLatitude = _args.rapLatitude;
var rapMail = _args.rapMail;
var rapPhone = _args.rapPhone;

// define values
rapTitle = "";
rapDate = "";
rapCat = "";
rapInhoud = "";
rapMail = "";
rapPhone = "";

/**
 *Function to create modal when clicked on the title row **************************************
 */

function createTitleView() {

	var myModal = Ti.UI.createWindow({
		title : 'My Modal',
		backgroundColor : 'transparent',
	});

	if (OS_ANDROID) {
		myModal.addEventListener('open', function(evt) {
			var actionBar = evt.source.activity.actionBar;
			if (actionBar) {
				actionBar.hide();
			}
		});
	}

	var wrapperView = Ti.UI.createView({

	});
	// Full screen

	var backgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.5,

	});

	if (OS_IOS) {

		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 65
		});
	}
	if (OS_ANDROID) {

		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 50
		});
	}

	var titleLabel = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : 18
		},
		text : 'Titel',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var separatorTop = Ti.UI.createView({
		top : 40,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5",
		zIndex : 1,
	});

	var separatorBottom = Ti.UI.createView({
		top : 160,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5"
	});

	var fieldTitle = Ti.UI.createTextArea({
		color : '#888',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		textAlign : 'left',
		value : '',
		height : 120,
		left : 10,
		right : 10
	});

	var nextButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 30,
		},
		title : '\uf101',
		bottom : 0,
		color : '#000',
		backgroundColor : 'none'

	});

	var closeButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00d',
		top : 0,
		left : 10,
		color : '#000',
		backgroundColor : 'none'
	});

	var submitButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00c',
		top : 0,
		right : 10,
		color : '#000',
		backgroundColor : 'none'
	});
	closeButton.addEventListener('click', function() {
		myModal.close();
	});
	nextButton.addEventListener('click', function() {
		if (fieldTitle.value != null) {
			$.titleValue.text = fieldTitle.value;
			$.titleValue.value = fieldTitle.value;
			rapTitle = fieldTitle;
			myModal.close();
			createCategory();

		}

		myModal.close();
	});
	submitButton.addEventListener('click', function() {

		if (fieldTitle.value != null) {
			$.titleValue.text = fieldTitle.value;
			$.titleValue.value = fieldTitle.value;
			rapTitle = fieldTitle;

			myModal.close();

			//alert(rapTitle.value);

		}
	});
	wrapperView.add(backgroundView);
	wrapperView.add(containerView);
	containerView.add(separatorTop);
	containerView.add(titleLabel);
	containerView.add(nextButton);
	containerView.add(closeButton);
	containerView.add(submitButton);
	containerView.add(separatorBottom);
	containerView.add(fieldTitle);
	myModal.add(wrapperView);
	myModal.open({
		//modal: true

	});

}

$.title.addEventListener('click', function(e) {

	createTitleView();
});

/**
 *Function to start modal when clicked on the datum row **************************************
 *

 function createDateView() {

 var myModal = Ti.UI.createWindow({
 title           : 'My Modal',
 backgroundColor : 'transparent'

 });

 if (OS_ANDROID) {
 myModal.addEventListener('open',function(evt){
 var actionBar=evt.source.activity.actionBar;
 if (actionBar){
 actionBar.hide();
 }
 });
 }

 var wrapperView    = Ti.UI.createView(); // Full screen

 var backgroundView = Ti.UI.createView({  // Also full screen
 backgroundColor : '#000',
 opacity         : 0.5
 });

 if (OS_IOS) {
 var containerView  = Ti.UI.createView({  // Set height appropriately
 backgroundColor : '#FFF',
 height: 400,
 top: 65
 });
 }

 if (OS_ANDROID) {
 var containerView  = Ti.UI.createView({  // Set height appropriately
 backgroundColor : '#FFF',
 height: 400,
 top: 50
 });
 }

 var separatorTop = Ti.UI.createView ({
 top:40,
 height: 2,
 width: "100%",
 backgroundColor:"#e5e5e5",
 zIndex: 1,
 });

 var separatorBottom = Ti.UI.createView ({
 bottom:40,
 height: 2,
 width: "100%",
 backgroundColor:"#e5e5e5"
 });

 var titleLabel = Ti.UI.createLabel({
 color: '#000',
 font: { fontSize:18 },
 text: 'Datum',
 textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
 top: 10,
 width: Ti.UI.SIZE, height: Ti.UI.SIZE
 });

 var nextButton    = Ti.UI.createButton({
 font:{
 fontFamily: 'fontawesome',
 fontSize: 30,
 },
 title  : '\uf101',
 bottom : 0,
 color: '#000',
 backgroundColor: 'none'
 });

 var closeButton    = Ti.UI.createButton({
 font:{
 fontFamily: 'fontawesome',
 fontSize: 24,
 },
 title  : '\uf00d',
 top : 0,
 left :10,
 color: '#000',
 backgroundColor: 'none'
 });

 var submitButton    = Ti.UI.createButton({
 font:{
 fontFamily: 'fontawesome',
 fontSize: 24,
 },
 title  : '\uf00c',
 top : 0,
 right :10,
 color: '#000',
 backgroundColor: 'none'
 });
 closeButton.addEventListener('click', function () {
 myModal.close();
 });
 nextButton.addEventListener('click', function () {
 if(picker.value != null)
 {
 $.dateValue.text = picker.value;
 $.dateValue.value = picker.value;
 rapDate = picker;
 myModal.close();
 createCategory();
 }

 });
 submitButton.addEventListener('click', function () {

 if(picker.value != null)
 {
 $.dateValue.text = picker.value;
 $.dateValue.value = picker.value;

 rapDate = picker;

 myModal.close();
 }
 });

 var picker = Ti.UI.createPicker({
 type : Ti.UI.PICKER_TYPE_DATE,
 minDate : new Date(2016, 0, 1),
 maxDate : new Date(2016, 11, 31),
 value:new Date(2014,3,12),
 font: {
 fontWeight: 'bold',
 fontSize:32,
 },
 top : 70,
 height:250,
 width: 300,

 });

 wrapperView.add(backgroundView);
 wrapperView.add(containerView);
 containerView.add(titleLabel);
 containerView.add(nextButton);
 containerView.add(closeButton);
 containerView.add(submitButton);
 containerView.add(picker);
 containerView.add(separatorTop);
 containerView.add(separatorBottom);
 myModal.add(wrapperView);

 myModal.open({
 animate : true
 });
 }

 $.date.addEventListener('click', function(e) {
 createDateView();
 });

 /**
 *Function to start modal when clicked on the categorie row **************************************
 */
function createCategory() {

	var myModal = Ti.UI.createWindow({
		title : 'My Modal',
		backgroundColor : 'transparent'
	});

	if (OS_ANDROID) {
		myModal.addEventListener('open', function(evt) {
			var actionBar = evt.source.activity.actionBar;
			if (actionBar) {
				actionBar.hide();
			}
		});
	}

	var wrapperView = Ti.UI.createView();
	// Full screen

	var backgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.5
	});

	if (OS_IOS) {
		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 400,
			top : 65
		});
	}
	if (OS_ANDROID) {
		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 400,
			top : 50
		});
	}

	var titleLabel = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : 18
		},
		text : 'Categorie',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var nextButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 30,
		},
		title : '\uf101',
		bottom : 0,
		color : '#000',
		backgroundColor : 'none'
	});

	var closeButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00d',
		top : 0,
		left : 10,
		color : '#000',
		backgroundColor : 'none'
	});

	var separatorTop = Ti.UI.createView({
		top : 40,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5",
		zIndex : 2,
	});

	var separatorBottom = Ti.UI.createView({
		bottom : 40,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5"
	});

	if (OS_IOS) {

		var data = [Ti.UI.createTableViewRow({
			title : 'Acohol',
			hasCheck : false,
			rowId : 1
		}), Ti.UI.createTableViewRow({
			title : 'Drugs',
			hasCheck : false,
			rowId : 2
		}), Ti.UI.createTableViewRow({
			title : 'Infectieziekten',
			hasCheck : false,
			rowId : 3
		}), Ti.UI.createTableViewRow({
			title : 'Milieu',
			hasCheck : false,
			rowId : 4
		}), Ti.UI.createTableViewRow({
			title : 'Niet lekker in je vel',
			hasCheck : false,
			rowId : 5
		}), Ti.UI.createTableViewRow({
			title : 'Ongeval',
			hasCheck : false,
			rowId : 6
		}), Ti.UI.createTableViewRow({
			title : 'Overige',
			hasCheck : false,
			rowId : 7
		})];

	}
	if (OS_ANDROID) {
		var data = [Ti.UI.createTableViewRow({
		    title : 'Acohol',
			height : 40,
			color : '#000',
			hasCheck : false,
			rowId : 1
		}), Ti.UI.createTableViewRow({
			title : 'Drugs',
			height : 40,
			color : '#000',
			hasCheck : false,
			rowId : 2
		}), Ti.UI.createTableViewRow({
			title : 'Infectieziekten',
			height : 40,
			color : '#000',
			hasCheck : false,
			rowId : 3
		}), Ti.UI.createTableViewRow({
			title : 'Niet lekker in je vel',
			height : 40,
			color : '#000',
			hasCheck : false,
			rowId : 4
		}), Ti.UI.createTableViewRow({
			title : 'Overige',
			height : 40,
			color : '#000',
			hasCheck : false,
			rowId : 5
		})];
	}

	var tableview = Titanium.UI.createTableView({

		top : 45,

		height : 300,
		//objName: 'table'
	});

	tableview.setData(data);

	function selectRow(e) {
		var rowId = e.rowData.rowId;
		var rowText = e.rowData.title;
		$.catValue.text = rowText;
		$.catValue.value = rowText;

		Ti.API.info('Id : ' + rowId);
		Ti.API.info('Value : ' + $.catValue.text);

		var arrayLength = data.length;
		for (var index = 0; index < arrayLength; index++) {
			var title = data[index].title;
			Ti.API.info(title + " " + rowText);

			if (title === rowText) {
				//alert('true');

				data[index].hasCheck = true;
			} else {
				data[index].hasCheck = false;
			}
		}

	}


	tableview.addEventListener('click', function(e) {

		selectRow(e);
	});

	var submitButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00c',
		top : 0,
		right : 10,
		color : '#000',
		backgroundColor : 'none'
	});
	closeButton.addEventListener('click', function() {
		myModal.close();
	});
	nextButton.addEventListener('click', function() {

		if ($.catValue.value != null) {
			rapCat = $.catValue;
			myModal.close();
			createContext();
		}
	});
	submitButton.addEventListener('click', function() {

		if ($.catValue.value != null) {
			rapCat = $.catValue;

			myModal.close();
		}
	});

	wrapperView.add(backgroundView);
	wrapperView.add(containerView);
	containerView.add(titleLabel);
	containerView.add(nextButton);
	containerView.add(closeButton);
	containerView.add(submitButton);
	containerView.add(tableview);
	containerView.add(separatorTop);
	containerView.add(separatorBottom);
	myModal.add(wrapperView);
	myModal.open({
		animate : true
	});

}

$.category.addEventListener('click', function(e) {

	createCategory();
});

/**
 *Function to start modal when clicked on the inhoud row **************************************
 */

function createContext() {

	var myModal = Ti.UI.createWindow({
		title : 'My Modal',
		backgroundColor : 'transparent'

	});

	if (OS_ANDROID) {
		myModal.addEventListener('open', function(evt) {
			var actionBar = evt.source.activity.actionBar;
			if (actionBar) {
				actionBar.hide();
			}
		});
	}

	var wrapperView = Ti.UI.createView();
	// Full screen

	var backgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.5
	});

	if (OS_IOS) {
		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 65
		});
	}

	if (OS_ANDROID) {
		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 50
		});
	}

	var titleLabel = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : 18
		},
		text : 'Inhoud',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var nextButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 30,
		},
		title : '\uf101',
		bottom : 0,
		color : '#000',
		backgroundColor : 'none'
	});

	var closeButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00d',
		top : 0,
		left : 10,
		color : '#000',
		backgroundColor : 'none'
	});

	var submitButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00c',
		top : 0,
		right : 10,
		color : '#000',
		backgroundColor : 'none'
	});

	var separatorTop = Ti.UI.createView({
		top : 40,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5",
		zIndex : 1,
	});

	var separatorBottom = Ti.UI.createView({
		top : 160,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5"
	});

	closeButton.addEventListener('click', function() {
		myModal.close();
	});
	nextButton.addEventListener('click', function() {
		if (fieldContext.value != null) {
			$.contextValue.text = fieldContext.value;
			$.contextValue.value = fieldContext.value;
			rapInhoud = fieldContext;
			myModal.close();
			createLocationView();

		}
	});
	submitButton.addEventListener('click', function() {

		if (fieldContext.value != null) {
			$.contextValue.text = fieldContext.value;
			$.contextValue.value = fieldContext.value;
			rapInhoud = fieldContext;
			myModal.close();
		}
	});

	var fieldContext = Ti.UI.createTextArea({
		borderWidth : 0,
		color : '#888',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		textAlign : 'left',
		value : '',
		height : 120,
		left : 10,
		right : 10
	});

	wrapperView.add(backgroundView);
	wrapperView.add(containerView);
	containerView.add(titleLabel);
	containerView.add(nextButton);
	containerView.add(closeButton);
	containerView.add(submitButton);
	containerView.add(fieldContext);
	containerView.add(separatorTop);
	containerView.add(separatorBottom);
	myModal.add(wrapperView);
	myModal.open({
		animate : true
	});

}

$.context.addEventListener('click', function(e) {

	createContext();
});

/**
 *Function to start modal when clicked on the locatie row **************************************
 */

function createLocationView() {

	var myModal = Ti.UI.createWindow({
		title : 'My Modal',
		backgroundColor : 'transparent'

	});

	if (OS_ANDROID) {
		myModal.addEventListener('open', function(evt) {
			var actionBar = evt.source.activity.actionBar;
			if (actionBar) {
				actionBar.hide();
			}
		});
	}

	var wrapperView = Ti.UI.createView();
	// Full screen

	var backgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.5
	});

	if (OS_IOS) {
		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 65
		});
	}

	if (OS_ANDROID) {
		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 50
		});
	}

	var titleLabel = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : 18
		},
		text : 'Locatie',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var nextButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf101',
		bottom : 0,
		color : '#000',
		backgroundColor : 'none'
	});

	var closeButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00d',
		top : 0,
		left : 10,
		color : '#000',
		backgroundColor : 'none'
	});

	var submitButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00c',
		top : 0,
		right : 10,
		color : '#000',
		backgroundColor : 'none'
	});

	var locationButton = Ti.UI.createButton({
		font : {
			fontSize : 24,
		},
		title : 'Deel locatie',
		color : '#000',
		backgroundColor : 'none'
	});

	var separatorTop = Ti.UI.createView({
		top : 40,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5",
		zIndex : 1,
	});

	var separatorBottom = Ti.UI.createView({
		bottom : 40,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5"
	});

	var gedeeldButton = Ti.UI.createButton({
		font : {
			fontSize : 24,
		},
		title : 'Locatie is gedeeld',
		color : '#000',
		backgroundColor : 'none'
	});

	locationButton.addEventListener('click', function() {

		if (Ti.Network.online) {
			Ti.Geolocation.purpose = "Receive User Location";
			Titanium.Geolocation.getCurrentPosition(function(e) {

				if (!e.success || e.error) {
					alert('Could not find the device location');
					return;
				}
				var longitude = e.coords.longitude;
				var latitude = e.coords.latitude;

				//alert("latitude: " + latitude + "longitude: " + longitude);

				locationButton.hide();

				containerView.add(gedeeldButton);

				rapLatitude = latitude;
				rapLongitude = longitude;

				$.locValue.text = "Gedeeld";
				$.locValue.value = "Gedeeld";

			});

		} else {
			alert("Internet connection is required to use localization features");
		}
	});

	closeButton.addEventListener('click', function() {
		myModal.close();
	});
	nextButton.addEventListener('click', function() {

		createMailView();
	});
	submitButton.addEventListener('click', function() {
		if (rapLatitude != "") {

		}

		myModal.close();
	});

	wrapperView.add(backgroundView);
	wrapperView.add(containerView);
	containerView.add(titleLabel);
	containerView.add(nextButton);
	containerView.add(closeButton);
	containerView.add(submitButton);
	containerView.add(locationButton);
	containerView.add(separatorTop);
	containerView.add(separatorBottom);
	myModal.add(wrapperView);
	myModal.open({
		animate : true
	});

}

$.location.addEventListener('click', function(e) {
	createLocationView();
});

function createMailView() {

	var myModal = Ti.UI.createWindow({
		title : 'My Modal',
		backgroundColor : 'transparent',
	});

	if (OS_ANDROID) {
		myModal.addEventListener('open', function(evt) {
			var actionBar = evt.source.activity.actionBar;
			if (actionBar) {
				actionBar.hide();
			}
		});
	}

	var wrapperView = Ti.UI.createView({

	});
	// Full screen

	var backgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.5,

	});

	if (OS_IOS) {

		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 65
		});
	}
	if (OS_ANDROID) {

		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 50
		});
	}

	var titleLabel = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : 18
		},
		text : 'Email Adres',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var separatorTop = Ti.UI.createView({
		top : 40,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5",
		zIndex : 1,
	});

	var separatorBottom = Ti.UI.createView({
		top : 160,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5"
	});

	var fieldTitle = Ti.UI.createTextArea({
		color : '#888',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		textAlign : 'left',
		value : '',
		height : 120,
		left : 10,
		right : 10
	});

	var nextButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 30,
		},
		title : '\uf101',
		bottom : 0,
		color : '#000',
		backgroundColor : 'none'

	});

	var closeButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00d',
		top : 0,
		left : 10,
		color : '#000',
		backgroundColor : 'none'
	});

	var submitButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00c',
		top : 0,
		right : 10,
		color : '#000',
		backgroundColor : 'none'
	});
	closeButton.addEventListener('click', function() {
		myModal.close();
	});
	nextButton.addEventListener('click', function() {
		if (fieldTitle.value != null) {
			$.mailValue.text = fieldTitle.value;
			$.mailValue.value = fieldTitle.value;
			rapMail = fieldTitle;
			myModal.close();
			createPhoneView();

		}

		myModal.close();
	});
	submitButton.addEventListener('click', function() {

		if (fieldTitle.value != null) {
			$.mailValue.text = fieldTitle.value;
			$.mailValue.value = fieldTitle.value;
			rapMail = fieldTitle;

			myModal.close();

			//alert(rapTitle.value);

		}
	});
	wrapperView.add(backgroundView);
	wrapperView.add(containerView);
	containerView.add(separatorTop);
	containerView.add(titleLabel);
	containerView.add(nextButton);
	containerView.add(closeButton);
	containerView.add(submitButton);
	containerView.add(separatorBottom);
	containerView.add(fieldTitle);
	myModal.add(wrapperView);
	myModal.open({
		//modal: true
	});

}

$.mail.addEventListener('click', function(e) {

	createMailView();
});

function createPhoneView() {

	var myModal = Ti.UI.createWindow({
		title : 'My Modal',
		backgroundColor : 'transparent',
	});

	if (OS_ANDROID) {
		myModal.addEventListener('open', function(evt) {
			var actionBar = evt.source.activity.actionBar;
			if (actionBar) {
				actionBar.hide();
			}
		});
	}

	var wrapperView = Ti.UI.createView({

	});
	// Full screen

	var backgroundView = Ti.UI.createView({// Also full screen
		backgroundColor : '#000',
		opacity : 0.5,

	});

	if (OS_IOS) {

		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 65
		});
	}
	if (OS_ANDROID) {

		var containerView = Ti.UI.createView({// Set height appropriately
			backgroundColor : '#FFF',
			height : 200,
			top : 50
		});
	}

	var titleLabel = Ti.UI.createLabel({
		color : '#000',
		font : {
			fontSize : 18
		},
		text : 'Mobiele nummer',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE
	});

	var separatorTop = Ti.UI.createView({
		top : 40,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5",
		zIndex : 1,
	});

	var separatorBottom = Ti.UI.createView({
		top : 160,
		height : 2,
		width : "100%",
		backgroundColor : "#e5e5e5"
	});

	var fieldTitle = Ti.UI.createTextArea({
		color : '#888',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		textAlign : 'left',
		value : '',
		height : 120,
		left : 10,
		right : 10
	});

	var nextButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 30,
		},
		title : '\uf101',
		bottom : 0,
		color : '#000',
		backgroundColor : 'none'

	});

	var closeButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00d',
		top : 0,
		left : 10,
		color : '#000',
		backgroundColor : 'none'
	});

	var submitButton = Ti.UI.createButton({
		font : {
			fontFamily : 'fontawesome',
			fontSize : 24,
		},
		title : '\uf00c',
		top : 0,
		right : 10,
		color : '#000',
		backgroundColor : 'none'
	});
	closeButton.addEventListener('click', function() {
		myModal.close();
	});
	nextButton.addEventListener('click', function() {
		if (fieldTitle.value != null) {
			$.telValue.text = fieldTitle.value;
			$.telValue.value = fieldTitle.value;
			rapPhone = fieldTitle;
			myModal.close();

		}

		myModal.close();
	});
	submitButton.addEventListener('click', function() {

		if (fieldTitle.value != null) {
			$.telValue.text = fieldTitle.value;
			$.telValue.value = fieldTitle.value;
			rapPhone = fieldTitle;

			myModal.close();

			//alert(rapTitle.value);

		}
	});
	wrapperView.add(backgroundView);
	wrapperView.add(containerView);
	containerView.add(separatorTop);
	containerView.add(titleLabel);
	containerView.add(nextButton);
	containerView.add(closeButton);
	containerView.add(submitButton);
	containerView.add(separatorBottom);
	containerView.add(fieldTitle);
	myModal.add(wrapperView);
	myModal.open({
		//modal: true

	});

}

$.telefoon.addEventListener('click', function(e) {

	createPhoneView();
});

function insertData() {

	function checkemail(emailAddress) {
		var str = emailAddress;
		var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (filter.test(str)) {
			testresults = true;
		} else {
			testresults = false;
		}
		return (testresults);
	};

	function checkNumber(no) {
		return !no.match(/[^0-9+]/g);
	}

	//if there is something in the textbox
	if (rapTitle == "" || rapTitle.value.length == 0 || rapCat == "" || rapInhoud == "" || rapInhoud.value.length == 0 || rapLatitude == null || rapLongitude == null) {
		//alert("Zorg ervoor dat alle calamiteit details zijn ingevoerd");
		var dialog = Ti.UI.createAlertDialog({
			message : 'Controlleer of alle calamiteit details velden zijn ingevoerd',
			ok : 'Ok',
			title : 'Niet alle velden zijn correct ingevuld'
		});

		dialog.show();
	} else if (rapMail != "" && rapTitle.value.length != 0 && checkemail(rapMail.value) != true) {

		var dialog = Ti.UI.createAlertDialog({
			message : 'Geef een geldig email adres op zodat de GGD contact met u op kan nemen indien nodig.',
			ok : 'Ok',
			title : 'Ongeldig email adres'
		});
		dialog.show();
	} else if (rapPhone != "" && checkNumber(rapPhone.value.trim()) == false && rapPhone.value.length != 10) {
		var dialog = Ti.UI.createAlertDialog({
			message : 'Geef een geldig telefoonnummer op zodat de GGD contact met u op kan nemen indien nodig.',
			ok : 'Ok',
			title : 'Ongeldig telefoon nummer'
		});
		dialog.show();
	} else {

		var request = Ti.Network.createHTTPClient({
			onload : function(e) {
				alert('Uw melding is verzonden');
				// json = JSON.parse(this.responseText);
				console.log(this.responseText);
			},
			onerror : function(e) {
				console.log(e);
				Ti.API.debug(e.error);
				alert('There was an error during the conection');
			}
			//timeout:1000,
		});

		//Request the data from the web service, Here you have to change it for your local ip
		request.open("POST", "http://williambergmans.nl/ggd/public/postMelding");
		var params = ( {
			"id" : "0",
			"titel" : rapTitle.value,
			"categorie" : rapCat.value,
			"inhoud" : rapInhoud.value,
			"longitude" : rapLongitude,
			"latitude" : rapLatitude,
			"mail" : rapMail.value,
			"phone" : rapPhone.value
		});
		request.send(params);
		console.log(params);
		$.report.close();

	}

};

