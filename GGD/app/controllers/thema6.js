/**
 * Instantiate the local variables for this controller
 */
var _args = arguments[0] || {}, // Any passed in arguments will fall into this property
	App = Alloy.Globals.App, // reference to the APP singleton object
	information = null,  // Array placeholder for all information
	indexes = [];  // Array placeholder for the ListView Index (used by iOS only);
	
/** 
 * Function to inialize the View, gathers data from the flat file and sets up the ListView
 */
function init(){
	
	 
	
		
//Array to store the data from the todo list
	var dataArray = [];
	
	//We execute the function to show the data for the first view
	getCalamiteitData();
	
	var json;

	function getCalamiteitData () {
		//function to use HTTP to connect to a web server and transfer the data.
		var sendit = Ti.Network.createHTTPClient({ 
			onerror: function(e){
				Ti.API.debug(e.error);
				alert('Er is iest fout gegaan tijdens het verbinden met de server');
			},
		   // timeout:1000,
		});
			
		//Here you have to change it for your local ip
		sendit.open('GET', 'http://williambergmans.nl.testbyte.nl/ggd/public/themaJson');  
		sendit.send(); 
		//Function to be called upon a successful response
		sendit.onload = function(){
		
			
		     json = JSON.parse(this.responseText);
			 json = json.information; 
			 
	
			//if the database is empty show an alert
			if(json.length == 0){
				alert() = "The database row is empty";   
			}
            //alert(json);
			
			//Emptying the data to refresh the view     
			//dataArray = [];
				
				builtListview(json);
				
		 
		 }; 
	};
	 

	
	function builtListview(information)
	{
	
	
	/**
	 * Access the FileSystem Object to read in the information from a flat file (lib/userData/data.js)
	 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.Filesystem
	 */
	//var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "infoData/info.json"); 
	
	/**
	 * Populate the information variable from the file this call returns an array
	 */
	//information = JSON.parse(file.read().text).information; 
	 
	 var infoTitel = information[5].titel;
	 var infoPhoto = information[5].photo;
	 var infoInhoud = information[5].info;
	 $.titel.text = infoTitel;
	 $.titel.value = infoTitel;
	 $.photo.image =  infoPhoto;
	 $.info.text = infoInhoud;
	 _args.phone = information[5].phone;
	 _args.email = information[5].email;
};

}; 

/**
 * Listen for the refresh event, and re-initialize
 */
Ti.App.addEventListener("refresh-data", function(e){
	init();
});


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
	    message: "Weet u zeker dat u wilt bellen naar "+_args.phone+" ?"
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
 * Initialize View
 */
init();


function closeWindow(){
	$.thema6.close();
}


