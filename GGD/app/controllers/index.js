
/**
 * Override a tab group's tab bar on iOS.
 *
 * NOTE: Call this function on a tabGroup AFTER you have added all of your tabs to it! We'll look at the tabs that exist
 * to generate the overriding tab bar view. If your tabs change, call this function again and we'll update the display.
 *
 * @param tabGroup The tab group to override
 * @param backgroundOptions The options for the background view; use properties like backgroundColor, or backgroundImage.
 * @param selectedOptions The options for a selected tab button.
 * @param deselectedOptions The options for a deselected tab button.
 * 
 */

 
 

var util = require('overrideTabs');


if(OS_IOS){
util.overrideTabs(
		
    $.index, // The tab group
    { backgroundColor: '#e28833' }, // View parameters for the background
    { backgroundColor: '#e25533', color: '#fff', style: 0 }, // View parameters for selected tabs 
    { backgroundColor: '#e28833', color: '#fff', style: 0 } // View parameters for deselected tabs
);
};

 
 


/**
 * Global Navigation Handler
 */
Alloy.Globals.Navigator = {

	/**
	 * Handle to the Navigation Controller
	 */
	navGroup: $.index,

	open: function(controller, payload){
		var win = Alloy.createController(controller, payload || {}).getView();

		if(OS_IOS){
			$.index.activeTab.open(win);
			//tabGroup.remove(tabGroup.overrideTabs);
			$.index.overrideTabs.hide();
			//$.index.remove($.index.overrideTabs);
			win.addEventListener('close',function(evt){
				//$.index.add($.index.overrideTabs);
				$.index.overrideTabs.show();
				
			});
	
		
		}
		else if(OS_MOBILEWEB){
				$.index.activeTab.open(win);
		}
		else {

			// added this property to the payload to know if the window is a child
			if (payload.displayHomeAsUp){

				win.addEventListener('open',function(evt){
					var activity=win.activity;
					activity.actionBar.displayHomeAsUp=payload.displayHomeAsUp;
					activity.actionBar.onHomeIconItemSelected=function(){
						evt.source.close();
					};
				});
			}
			win.open();
		}
	} 
};




/*
if (OS_ANDROID) {
	


Alloy.Globals.tabGroup=$.index;
Alloy.Globals.currentTab=0; 

function doopen(evt){
	var activity = evt.source.getActivity();

	activity.onCreateOptionsMenu = function(e) {
		var item, menu;
		menu = e.menu;
		menu.clear();
		
		switch(Alloy.Globals.currentTab){
			case 0:
		
				 
				break;
			case 1:
				
				item1 = e.menu.add({
					title : "Share",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					icon : Ti.Android.R.drawable.ic_menu_send
				});
				item1.addEventListener("click", function(e) {					
					Alloy.Globals.Navigator.open("notificatielijst", {restrictToFavorites:true, title:"Favorites", displayHomeAsUp:true});
				});
				
				// Use action bar search view
                var search = Ti.UI.Android.createSearchView({
                 hintText: "Zoek"
                 });
				
			
				item2 = menu.add({
                       title: 'Table Search',
                       actionView : search,
                       icon: (Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png"),
                       showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
    });
				
				
				search.addEventListener("change", function(e) {			
							//onSearchChange();
							//$.listView.searchText = e.source.value; 
			
				});
				
				
				
				break;
		}
	};

	Alloy.Globals.tabGroup.addEventListener("focus", function(evt) {
		if (typeof evt.index !== "undefined"){
			activity.invalidateOptionsMenu();
			Alloy.Globals.currentTab=evt.index;	
		} 
	});
}
}
*/


 
$.index.open();



 
 





