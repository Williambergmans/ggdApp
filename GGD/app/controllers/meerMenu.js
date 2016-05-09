

var items = [
	    {
	        menuicon: {text: "\uf041"}, 
	        name : {text : "Mijn Locatie"}, 
	        bindId : '1',  
	    },  
	     {
	        menuicon: {text: "\uf055"},
	        name : {text : "Raporteer"},
	        bindId : '2',
	    },  
	    {
	        menuicon: {text: "\uf05a"},
	        name : {text : "Over deze app"},
	        bindId : '3',
	    },
	     {
	        menuicon: {text: "\uf013"},
	        name : {text : "Instellingen"},
	        bindId : '4',
	    },  
	];
	
	/*
	
	items.push({
	        menuicon: {text: "\uf007"},
	        name : {text : "Mijn account"},
	        bindId : '5',
	 } ); 

	*/
$.elementsList.sections[0].setItems(items); 





 $.elementsList.addEventListener('itemclick', function(e){
 	
 	 var row = $.elementsList.sections[0].getItemAt(e.itemIndex);
 	
 	  if (row.bindId === "1") {
         	
         	 Alloy.Globals.Navigator.open('map', {displayHomeAsUp:true}); 
            
        } else if (row.bindId === '2') {
        	
        	 Alloy.Globals.Navigator.open('report', {displayHomeAsUp:true}); 
        }
        else if (row.bindId === '3') {  
        	
        	 Alloy.Globals.Navigator.open('appInfo', {displayHomeAsUp:true}); 

        }
        else if (row.bindId === '4') {
        	
        	Alloy.Globals.Navigator.open('settings', {displayHomeAsUp:true});  
        }
        else if (row.bindId === '5') {
        	
        	Alloy.Globals.Navigator.open('accountInfo', {displayHomeAsUp:true});  
        }
 });
 
$.meer.open();