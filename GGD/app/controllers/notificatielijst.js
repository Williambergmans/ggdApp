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
 * This is the controller file for the Directory View. The directory view loads data from 
 * a flat file, and derives a Sectioned and Indexed (iOS) ListView displaying all contacts.
 * The Directory has two ListView Templates, one for standard contacts, the other to denote
 * that you have a marked the contact as a Bookmark (or Favorite). Also, the Directory View
 * can be filtered so that it only displays bookmarked or favorited contacts.
 *
 * @copyright
 * Copyright (c) 2014 by Appcelerator, Inc. All Rights Reserved.
 *
 * @license
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 */




/**
 * Instantiate the local variables for this controller
 */
var _args = arguments[0] || {}, // Any passed in arguments will fall into this property
	App = Alloy.Globals.App, // reference to the APP singleton object
	$FM = require('favoritesmgr'),  // FavoritesManager object (see lib/utilities.js)
	calamiteiten = null,  // Array placeholder for all calamiteiten
	indexes = [];  // Array placeholder for the ListView Index (used by iOS only);
	

/**
 * Appcelerator Analytics Call
 */
var title = _args.title ? _args.title.toLowerCase() : "infolijst";
Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".viewed");
  
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
				alert('There was an error during the conexion');
			},
		    timeout:1000,
		});
			
		//Here you have to change it for your local ip
		sendit.open('GET', 'http://williambergmans.nl/ggd/public/calamiteitenJson');   
		sendit.send(); 
		//Function to be called upon a successful response
		sendit.onload = function(){
		
			
		     json = JSON.parse(this.responseText);
			 json = json.calamiteiten;
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
	 
	  









	/**
	 * Access the FileSystem Object to read in the information from a flat file (lib/calamiteitData/data.js)
	 * DOCS: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.Filesystem
	 */
	//var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory + "userData/calamiteiten.json"); 
	
	/**
	 * Populate the calamiteiten variable from the file this call returns an array
	 */
	//calamiteiten = JSON.parse(file.read().text).calamiteiten; 
	
	/**
	 * Sorts the `calamiteiten` array by the lastName property of the calamiteit (leverages UnderscoreJS _.sortBy function)
	 */
	/*
	calamiteiten = _.sortBy(calamiteiten, function(calamiteit){
		return calamiteit.lastName;
	});
	*/
	/**
	 * IF the calamiteiten array exists
	 */
	 
	function builtListview(calamiteiten)
	{
	/**
	 * IF the calamiteiten array exists
	 */
	if(calamiteiten) {
		
		/**
		 * Setup our Indexes and Sections Array for building out the ListView components
		 * 
		 */
		indexes = [];
		var sections = [];
		
		/**
		 * Group the data by first letter of last name to make it easier to create 
		 * sections. (leverages the UndrescoreJS _.groupBy function)
		 */
		var calamiteitGroups  = _.groupBy(calamiteiten, function(item){
		 	return item.calamiteitTitel.charAt(0);
		}); 
        
        /**
         * Iterate through each group created, and prepare the data for the ListView
         * (Leverages the UnderscoreJS _.each function)
         */
		_.each(calamiteitGroups, function(group){

			/**
			 * Take the group data that is passed into the function, and parse/transform
			 * it for use in the ListView templates as defined in the directory.xml file.
			 */
			var dataToAdd = preprocessForListView(group);

			/**
			 * Check to make sure that there is data to add to the table,
			 * if not lets exit
			 */
			if(dataToAdd.length < 1) return;
			
			
			/**
			 * Lets take the first Character of the LastName and push it onto the index
			 * Array - this will be used to generate the indices for the ListView on IOS
			 */
			indexes.push({
				index: indexes.length,
				title: group[0].calamiteitTitel.charAt(0)
			});


			/**
			 * Create a new ListViewSection, and ADD the header view created above to it.
			 */
			 var section = Ti.UI.createListSection({
			
			});

			/**
			 * Add Data to the ListViewSection
			 */
			section.items = dataToAdd;
			
			/**
			 * Push the newly created ListViewSection onto the `sections` array. This will be used to populate
			 * the ListView 
			 */
			sections.push(section);
		});

		/**
		 * Add the ListViewSections and data elements created above to the ListView
		 */
		$.listView.sections = sections;
		
		/**
		 * For iOS, we add an event listener on the swipe of the ListView to display the index of the ListView we 
		 * created above. The `sectionIndexTitles` property is only valid on iOS, so we put these handlers in the iOS block.
		 */
		if(OS_IOS) {
			$.wrapper.addEventListener("swipe", function(e){
				if(e.direction === "left"){
					$.listView.sectionIndexTitles = indexes;
				}
				if(e.direction === "right"){
					$.listView.sectionIndexTitles = null;
				}
			});
		}
	}
	}
	
	/**
	 * Update the Window title if required (only used when we create the Bookmarks View)
	 */
	if(_args.title){
		$.wrapper.title = _args.title;
	}
	
	/**
	 * Check to see if the `restrictToFavorites` flag has been passed in as an argument, and 
	 * hide the favorite icon accordingly
	 */
	if(_args.restrictToFavorites){
		OS_IOS && ($.searchBar.showBookmark = false);
		
	}
	/*
	else {
			
		if(OS_IOS){
			$.wrapper.leftNavButton = Ti.UI.createLabel({
				text: "\ue601",
				color: "#C41230",
				font:{
					fontFamily:"icomoon",
					fontSize:36
				}
			});
		}
	}
*/
};

/**
 *	Convert an array of data from a JSON file into a format that can be added to the ListView
 * 
 * 	@param {Object} Raw data elements from the JSON file.
 */
var preprocessForListView = function(rawData) {
	 
	/**
	 * If we need to filter the view to only show bookmars, check to see if the `restrictToFavorites` 
	 * flag has been passed in as an argument to the controller, and only show calamiteiten that are favorites
	 */
	if(_args.restrictToFavorites) {
		
		/**
		 * redefines the collection to only have calamiteiten that are currently listed as favorites (leverages
		 * 	the UnderscoreJS _.filter function )
		 */
		rawData = _.filter(rawData, function(item){
			
			/**
			 * each item (or calamiteit) that is referenced, we look to see if the calamiteit id is included in favorites array
			 * retrieved from persistent storage above
			 */
			return $FM.exists(item.id);
		}); 
	}


	
	/**
	 * Using the rawData collection, we map data properties of the calamiteiten in this array to an array that maps an array to properly
	 * display the data in the ListView based on the templates defined in directory.xml (levearges the _.map Function of UnderscoreJS)
	 */
	return _.map(rawData, function(item) {
		
		/**
		 * Need to check to see if this calamiteit item is a favorite. If it is, we will use the `favoriteTemplate` in the ListView.
		 * (leverages the _.find function of UnderscoreJS)
		 */
		var isFavorite = $FM.exists(item.id);
		
		if(item.template == "vragenlijstTemplate")
		{
		var isVraag =  true;
		}
		
		/**
		 * Create the new calamiteit object which is added to the Array that is returned by the _.map function. 
		 */ 
		return {
			template: isFavorite ? "favoriteTemplate" : isVraag ? "vragenlijstTemplate" : "calamiteitTemplate",
			properties: {
				searchableText: item.calamiteitTitel + item.locatie + item.datum,
				calamiteit: item,
				editActions: [
					{title: isFavorite ? "- Favorite" : "+ Favorite", color: isFavorite ? "#C41230" : "#038BC8" }
				],
				canEdit:true
			},
			calamiteitName: {text: item.calamiteitTitel},
			calamiteitOmschrijving: {text: item.omschrijving},
			calamiteitPhoto: {image: item.photo},
			calamiteitCategorie: {text: "Categorie: " +  item.categorie},
			calamiteitLocatie: {  text: " " + item.locatie},
			calamiteitDatum: {  text:  item.maand},
			calamiteitDag: {  text:  item.dag},
			calamiteitDagGetal: {  text:  item.dagGetal}, 
		    calamiteitStatus: {  text:  item.start + " t/m " + item.eind},
		    calamiteitVraag: {text: "Wilt u een enquête invullen i.v.m. "+ "'" + item.calamiteitTitel + "'"},

			     
		};
	});	
};



function onJaClick(e){

   var item = $.listView.sections[e.sectionIndex].items[e.itemIndex];
   Alloy.Globals.Navigator.open("vragenlijst", item.properties.calamiteit);
}

/**
 * This function handles the click events for the rows in the ListView.
 * We want to capture the calamiteit property associated with the row, and pass
 * it into the profile View
 * 
 * @param {Object} Event data passed to the function
 */
function onItemClick(e){
	
	
	/**
	 * Appcelerator Analytics Call
	 */
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".contact.clicked");
	
	/**
	 * Get the Item that was clicked
	 */
	var item = $.listView.sections[e.sectionIndex].items[e.itemIndex];
	
	/**
	 * Open the profile view, and pass in the calamiteit data for this contact	 
	 */
	if(item.template !== "vragenlijstTemplate")
	{
	
	Alloy.Globals.Navigator.open("details", item.properties.calamiteit);
	}
}

/**
 * This code is only relevant to iOS - to make it cleaner, we are declaring variables, and
 * then assigning them to functions within an iOS Block. On MobileWeb, Android, etc this code block will not
 * exist
 */
var onSearchChange, onSearchFocus, onSearchCancel;

/**
 * Handles the favorite icon click event. Launches this same control as a child window, but limits the view
 * to only favoitems.
 * 
 * @param {Object} Event data passed to the function
 */
var onBookmarkClick = function onClick (e){
	 
	/**
	 * Appcelerator Analytics Call
	 */
	Ti.Analytics.featureEvent(Ti.Platform.osname+"."+title+".favorites.clicked");
	
	/**
	 * Open this same controller into a new page, pass the flag to restrict the list only to favorite Contacts and force the title
	 */
	Alloy.Globals.Navigator.open("notificatielijst", {restrictToFavorites:true, title:"Favorites", displayHomeAsUp:true});
};

/**
 * Handles the SearchBar OnChange event
 * 
 * @description On iOS we want the search bar to always be on top, so we use the onchange event to tie it back
 * 				to the ListView
 * 
 * @param {Object} Event data passed to the function
 */

if(OS_ANDROID){

$.wrapper.addEventListener('open',function(e){
	
	Ti.App.addEventListener("onSearchChange",onSearchChange);
	
});

$.wrapper.addEventListener('close',function(e){
	
	Ti.App.removeEventListener("onSearchChange",onSearchChange);
	
});

}

onSearchChange = function onChange(e){
	$.listView.searchText = e.source.value;
};
	
if(OS_IOS){
	
	/**
	 * Updates the UI when the SearchBar gains focus. Hides the Bookmark icon and shows
	 * the Cancel button.
	 * 
	 * @description We want to use both the bookmark feature and Cancel, but don't want them to show up together (EWW!)
	 * 				so we use the focus event to show the Cancel button and hide the bookmark
	 * 
	 * @param {Object} Event data passed to the function
	 */
	onSearchFocus = function onFocus(e){
			$.searchBar.showBookmark = false;
			$.searchBar.showCancel = true;
	};
	
	/**
	 * Updates the UI when the Cancel button is clicked within the search bar. Hides the Cancel button and shows
	 * the Bookmark icon
	 * 
	 * @param {Object} Event data passed to the function
	 */
	onSearchCancel = function onCancel(e){
		if(!_args.restrictToFavorites){
			$.searchBar.showBookmark = true;
			$.searchBar.showCancel = false;
		}	
		$.searchBar.blur();
	};
	
	/**
	 * Updates calamiteit record favorite classification and the list elements
	 * 
	 *  @param {Object} e  Event data passed to the function
	 */
	function onRowAction(e){
		
		var row = e.section.getItemAt(e.itemIndex);
		var id = row.properties.calamiteit.id;
		
		if(e.action === "+ Favorite") {
			$FM.add(id);
		}
		else {
			$FM.remove(id);
		}
		
		$.listView.editing = false;
		init();
	}
	
	/* 
	 * Assign `editaction` event listener to ListView 
	 * 
	 * NOTE: Updated to 'editaction' instead of 'rowAction' per
	 * ticket
	 * https://jira.appcelerator.org/browse/TIMOB-19096
	 */
	$.listView.addEventListener("editaction", onRowAction);
}

/**
 * Hide Bookmark Icon (Android)
 */
$.wrapper.addEventListener("open", function onWindowOpen(){
	if(OS_ANDROID && _args.restrictToFavorites){
		
		var activity = $.wrapper.getActivity();
		activity.onCreateOptionsMenu = function(e) {
	 		e.menu.clear();
		};	 
		activity.invalidateOptionsMenu();
	}
});

/**
 * Listen for the refresh event, and re-initialize
 */
Ti.App.addEventListener("refresh-data", function(e){
	init();
});

 
  
/** 
 * Initialize View
 */
init();


