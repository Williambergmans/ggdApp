
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
			
			// Use action bar search view
                var search = Ti.UI.Android.createSearchView({
                 hintText: "Zoek"
                 });
				
			
				item1 = menu.add({
                       title: 'Table Search',
                       actionView : search,
                       icon: (Ti.Android.R.drawable.ic_menu_search ? Ti.Android.R.drawable.ic_menu_search : "my_search.png"),
                       showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM | Ti.Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW
    });
				
				
				search.addEventListener("change", function(e) {			
							
						Ti.App.fireEvent("onSearchChange", e);
							
				}); 
			
				
				item2 = e.menu.add({
					title : "Favorite",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					icon : 'favorite.png'
				});
				item2.addEventListener("click", function(e) {					
					Alloy.Globals.Navigator.open("notificatielijst", {restrictToFavorites:true, title:"Favorites", displayHomeAsUp:true});
				});
				
				item3 = e.menu.add({
					title : "Refresh",
					showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
					icon : 'refresh.png'
				});
				item3.addEventListener("click", function(e) {					
						Ti.App.fireEvent("androidRefresh", e);
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


var pushnotifications = require('com.pushwoosh.module');
Ti.API.info("module is => " + pushnotifications);
     
pushnotifications.pushNotificationsRegister({
    "pw_appid": "5CA68-8E3D5",
    "gcm_projectid": "414217903299",
   
    success:function(e) 
    {   
    	    
    	
        setTimeout(function() {
            Ti.API.info('JS registration success event: ' + e.registrationId);
             
                if(true){
        var request = Ti.Network.createHTTPClient({
		    onload: function(e){
		    	// alert('Uw melding is verzonden');
		    	 // json = JSON.parse(this.responseText);
		    	  console.log(this.responseText);
		    },
		    onerror: function(e){
		    	console.log(e);
		        Ti.API.debug(e.error);
		        alert('There was an error during the conection');
		    },
		    //timeout:0,
			});	
			//Request the data from the web service, Here you have to change it for your local ip
			request.open("POST","http://www.williambergmans.nl/ggd/public/postUserData");
			var params = ({"id": "0" ,"phoneid": e.registrationId});  
		    request.send(params); 
        }
        }, 0);
    }, 
    
    error:function(e)
    {
        setTimeout(function() {
            Ti.API.error("Error during registration: "+e.error);
        }, 0);
    }, 
    callback:function(e) // called when a push notification is received
    {
        setTimeout(function() {
            //push notifications title: e.data.aps.alert
            Ti.API.info('JS message event: ' + JSON.stringify(e.data));
        }, 0);
    }
});


  
 
$.index.open();
 



