/**
 *                              _                _             
 *                             | |              | |            
 *    __ _ _ __  _ __   ___ ___| | ___ _ __ __ _| |_ ___  _ __ 
 *   / _` | '_ \| '_ \ / __/ _ \ |/ _ \ '__/ _` | __/ _ \| '__|
 *  | (_| | |_) | |_) | (_|  __/ |  __/ | | (_| | || (_) | |   
 *   \__,_| .__/| .__/ \___\___|_|\___|_|  \__,_|\__\___/|_|   
 *        | |   | |                                            
 *        |_|   |_|  
 *      
 *      
 * @overview
 * This is the controller file for the details View. The Contact details displays 
 * information passed in from the Directory View
 *
 * @copyright
 * Copyright (c) 2014 by Appcelerator, Inc. All Rights Reserved.
 *
 * @license
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */


/**
 * Instantiate the variables assocaited with this controller
 */
var _args = arguments[0] || {},
	Map = OS_MOBILEWEB ? Ti.Map : require('ti.map'),  // Reference to the MAP API
	$FM = require('favoritesmgr');	  // FavoritesManager helper class for managing favorites

/**
 * Check for passed in properties of the contact, and update the 
 * Label text and ImageView image values as required
 */
$.name.text = _args.calamiteitTitel;
$.informatie.text = _args.about;
$.wattedoen.text = _args.omschrijving;
$.locatieLabel.text = _args.locatie;
//$.company.text = _args.company;
//$.phone.text = _args.phone;
//$.email.text = _args.email;
//$.im.text = _args.im || _args.firstName+"."+_args.lastName;


/**
 * Set the Map Region for the Map Module so that it is at the right zoom level
 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Modules.Map
 */
	//var lat = OS_ANDROID ? _args.latitude+0.75 : _args.latitude;
	$.mapview.setRegion({
		latitude:  _args.latitude || 51.400000,
		longitude: _args.longitude || 5.000000,
		latitudeDelta:0.05,
		longitudeDelta:0.05,
		zoom:1, 
		//tilt:45
	});

/**
 * Create the Map Annotation to the latitude and longitude assigned to the user.
 */


var mapAnnotation = Map.createAnnotation({
    latitude: _args.latitude || 30.631256,
    longitude: _args.longitude || -97.675422,
    customView: Alloy.createController("annotation", {image: _args.photo}).getView(),
    animate:true
});

/**
 * Add the Map Annotation to the MapView
 */
 $.mapview.addAnnotation(mapAnnotation);

/**
 * Check that the contact is not already a favorite, and update the favorites button
 * title as required.
 */
$FM.exists(_args.id) && $.addFavoriteBtn.setTitle("- Verwijder uit favorieten");



/**
 * Appcelerator Analytics Call
 */
Ti.Analytics.featureEvent(Ti.Platform.osname+".details.viewed");



/**
 * Function to Email the Contact using the native email tool
 */
function emailContact() {

	/**
	 * Appcelerator Analytics Call
	 */
	Ti.Analytics.featureEvent(Ti.Platform.osname+".details.emailButton.clicked");
	
	/**
	 * Account for if the user is on iOS and using a simulator - iOS Simulator no 
	 * longer supports sending email as of iOS 8
	 */
	if(OS_IOS && Ti.Platform.model === "Simulator"){
		alert("Simulator does not support sending emails. Use a device instead");
		return;
	}
	/**
	 * Create an Email Dialog
	 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.EmailDialog
	 */
	var emailDialog = Ti.UI.createEmailDialog();
	
	/**
	 * Setup the Email Dialog information, in this case just the recipients field
	 */ 
	emailDialog.toRecipients = [_args.email];
	
	/**
	 * Once we have created and setup the Email Dialog, lets open the view
	 */
	emailDialog.open();
};

/**
 * Function to quickly call the contact from the details Screen
 */
function callContact(){
	
	/**
	 * Appcelerator Analytics Call
	 */
	Ti.Analytics.featureEvent(Ti.Platform.osname+".details.callContactButton.clicked");
	
	/**
	 * Before we send the phone number to the platform for handling, lets first verify
	 * with the user they meant to call the contact with an Alert Dialog
	 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.AlertDialog
	 */
	var dialog = Ti.UI.createAlertDialog({
	    cancel: 0,
	    buttonNames: ['Cancel', 'Ok'],
	    message: "Weet u zkere dat u wil bellen naar "+_args.firstName+" at "+_args.phone
	});
	
	/**
	 * Event Handler associated with clicking the Alert Dialog, this handles the 
	 * actual call to the platform to make the phone call
	 */
	dialog.addEventListener('click', function(e){
		 if (e.index !== e.source.cancel){
	    
	     	// IF WE ARE BUILDING FOR DEVELOPMENT PURPOSES - TRY CALLING A FAKE NUMBER
	      	if(ENV_DEV){
	      		Ti.Platform.openURL("tel:+15125551212");
	      	}
	      	// ELSE IF WE ARE BUILDING PRODUCTION - THEN USE THE LISTED NUMBER
	      	else if(ENV_PRODUCTION){
	      		Ti.Platform.openURL("tel:"+_args.phone);
	      	}
	    }  
	});
	
	/**
	 * After everything is setup, we show the Alert Dialog to the User
	 */
	dialog.show();
	 
};

/**
 * Toggle favorites Status
 */
function toggleFavorite(){

	/**
	 * If the user is not currently listed as a favorite user
	 */
	if(!$FM.exists(_args.id)){
		
		/**
		 * Appcelerator Analytics Call
		 */
		Ti.Analytics.featureEvent(Ti.Platform.osname+".details.addToFavorites.clicked");
	
		/**
		 * Then add this user to the favorites array, and update the button title for favorites
		 */
		$FM.add(_args.id);
	    $.addFavoriteBtn.setTitle("- Verwijder uit favorieten");
	}
	else{
		
		/**
		 * Appcelerator Analytics Call
		 */
		Ti.Analytics.featureEvent(Ti.Platform.osname+".details.removeFromFavorites.clicked");
		
	    /**
		 * Else remove the user from the favorites array (usess Underscore js difference function), 
		 * and update the button title accordingly
		 */
		$FM.remove(_args.id);
	    $.addFavoriteBtn.setTitle("+ Voeg toe aan favorieten"); 
	}
	
	/**
	 * Fire event to trigger a data refresh in the directory view
	 */
	Ti.App.fireEvent("refresh-data");
	
};

/**
 * Closes the Window
 */
function closeWindow(){
	$.details.close();
}