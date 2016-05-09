
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
 */



 exports.overrideTabs = function (tabGroup, backgroundOptions, selectedOptions, deselectedOptions) {
    // a bunch of our options need to default to 0 for everything to position correctly; we'll do it en mass:
    deselectedOptions.top = deselectedOptions.bottom
        = selectedOptions.top = selectedOptions.bottom
        = backgroundOptions.left = backgroundOptions.right = backgroundOptions.bottom = 0;

    // create the overriding tab bar using the passed in background options
    backgroundOptions.height = 50;
    var background = Ti.UI.createView(backgroundOptions);

    // pass all touch events through to the tabs beneath our background
    background.touchEnabled = false;

    // create our individual tab buttons
    var increment = 100 / tabGroup.tabs.length;
    deselectedOptions.width = selectedOptions.width = increment + '%';
    for (var i = 0, l = tabGroup.tabs.length; i < l; i++) {
        var tab = tabGroup.tabs[i];
        
      tabGroup.tabs[0].title = '';
      tabGroup.tabs[1].title = '';
      tabGroup.tabs[2].title = ''; 
     
        // position our views over the tab.
        selectedOptions.left = deselectedOptions.left = increment * i + '%';

        // customize the selected and deselected based on properties in the tab.
        
        
        selectedOptions.title = deselectedOptions.title = tab.title;


        if (tab.backgroundImage) {
            selectedOptions.backgroundImage = deselectedOptions.backgroundImage = tab.backgroundImage;
        }
        if (tab.selectedBackgroundImage) {
            selectedOptions.backgroundImage = tab.selectedBackgroundImage;
        }
        if (tab.deselectedBackgroundImage) {
            deselectedOptions.backgroundImage = tab.deselectedBackgroundImage;
        }
        selectedOptions.visible = false;
        background.add(tab.deselected = Ti.UI.createButton(deselectedOptions));
        background.add(tab.selected = Ti.UI.createButton(selectedOptions));
        background.add(tab[0] = Ti.UI.createLabel({	
         	 color: '#fff',
             font: { fontSize:30 },
             //text: '\uf015 f00a',
             text: '\uf00a',
             font:{
		     fontFamily: 'fontawesome', 
		     fontSize: 30 
	         },
             width: "33.333%",
             left:0,
             textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
             top: 5,
             }));
              background.add(tab[1] = Ti.UI.createLabel({	
         	 color: '#fff',
             font: { fontSize:30 },
             text: '\uf071',
             font:{
		     fontFamily: 'fontawesome', 
		     fontSize: 30 
	         },
             width: "33.333%",
             textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
             top: 5,
             }));   

             background.add(tab[2] = Ti.UI.createLabel({	
         	 color: '#fff',
             font: { fontSize:30 },
             text: '\uf0c9',
             font:{
		     fontFamily: 'fontawesome', 
		     fontSize: 30 
	         },
             width: "33.333%",
             right:0,
             textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
             top: 5,
             }));
             
             
             background.add(tab[1] = Ti.UI.createLabel({	
         	 color: '#fff',
             font: { fontSize:10 },
             text: 'overzicht',
             width: "33.333%",
             left:0,
             textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
             bottom: 2,
             }));
              background.add(tab[1] = Ti.UI.createLabel({	
         	 color: '#fff',
             font: { fontSize:10 },
             text: 'Calamiteiten',
             width: "33.333%",
             textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
             bottom: 2,
             }));   

             background.add(tab[2] = Ti.UI.createLabel({	
         	 color: '#fff',
             font: { fontSize:10 },
             text: 'Meer',
             width: "33.333%",
             right:0,
             textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
             bottom: 2,
             }));

    };
    
   
    // update the tab group, removing any old overrides
    if (tabGroup.overrideTabs) {
        tabGroup.remove(tabGroup.overrideTabs);
    }
    else {
        tabGroup.addEventListener('focus', overrideFocusTab);
        
    }

    tabGroup.add(background);
    tabGroup.overrideTabs = background;
    //tabGroup.remove(tabGroup.overrideTabs);
       
   
   
   
};


// change selected tab color
function overrideFocusTab(evt) {
    if (evt.previousIndex >= 0) {
        evt.source.tabs[evt.previousIndex].selected.visible = false;

    }
   evt.tab.selected.visible = true;
}


