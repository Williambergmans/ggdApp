/**
 * Instantiate the variables assocaited with this controller
 */
var _args = arguments[0] || {},
	vraag1Antwoord = null,
	vraag2Antwoord = null,
	vraag3Antwoord = null,
	vraag4Antwoord = null,
	vraag5Antwoord = null ;	  // FavoritesManager helper class for managing favorites

/**
 * Check for passed in properties of the contact, and update the 
 * Label text and ImageView image values as required
 */
$.titel.text =  "Deze korte enquete heeft betrekking tot de melding '"+ _args.calamiteitTitel + "'. Heeft u de volgende symptomen?";  
$.photo.image = _args.photo;
$.vraag1Titel.text = _args.vraag1Titel;
$.vraag2Titel.text = _args.vraag2Titel;
$.vraag3Titel.text = _args.vraag3Titel;
$.vraag4Titel.text = _args.vraag4Titel;
$.vraag5Titel.text = _args.vraag5Titel;





$.true1.addEventListener('click', function() { 

	$.true1.color = "#4CBB17";
	$.false1.color = "#d4d4d4";
	vraag1Antwoord = "Ja"; 
});
$.false1.addEventListener('click', function() {	
	$.true1.color = "#d4d4d4";
	$.false1.color = "red";
	vraag1Antwoord = 'Nee'; 
});
$.true2.addEventListener('click', function() { 
	$.true2.color = "#4CBB17";
	$.false2.color = "#d4d4d4";
	vraag2Antwoord = "Ja";
});
$.false2.addEventListener('click', function() {	
	$.true2.color = "#d4d4d4";
	$.false2.color = "red"; 
	vraag2Antwoord = 'Nee';
});
$.true3.addEventListener('click', function() { 
	$.true3.color = "#4CBB17";
	$.false3.color = "#d4d4d4";
	vraag3Antwoord = "Ja"; 
});
$.false3.addEventListener('click', function() {	
	$.true3.color = "#d4d4d4";
	$.false3.color = "red";
	vraag3Antwoord = 'Nee';
});
$.true4.addEventListener('click', function() { 
	$.true4.color = "#4CBB17";
	$.false4.color = "#d4d4d4";
	vraag4Antwoord = "Ja";
});
$.false4.addEventListener('click', function() {	
	$.true4.color = "#d4d4d4";
	$.false4.color = "red";
	vraag4Antwoord = 'Nee';
});
$.true5.addEventListener('click', function() { 
	$.true5.color = "#4CBB17";
	$.false5.color = "#d4d4d4";
	vraag5Antwoord = "Ja";
});
$.false5.addEventListener('click', function() {	
	$.true5.color = "#d4d4d4";
	$.false5.color = "red";
	vraag5Antwoord = 'Nee';
});

function closeWindow(){
	$.wrapper.close();
}


var vraagdata = [

];  



function validateAndSave(){

	var titel = $.titel.text;
	var vraag1 = $.vraag1Titel.text + " " + vraag1Antwoord;
	var vraag2 = $.vraag2Titel.text + " " + vraag2Antwoord;
	var vraag3 = $.vraag3Titel.text + " " + vraag3Antwoord;
	var vraag4 = $.vraag4Titel.text + " " + vraag4Antwoord;
	var vraag5 = $.vraag5Titel.text + " " + vraag5Antwoord;	
	alert(vraag1);
	alert(vraag2);
	alert(vraag3);
	alert(vraag4);
	alert(vraag5);
	
 		//if there is something in the textbox
 		if(vraag1Antwoord != "" && vraag1Antwoord != null){
 			var request = Ti.Network.createHTTPClient({
		    onload: function(e){
		    	 alert('Uw melding is verzonden');
		    	 // json = JSON.parse(this.responseText);
		    	  console.log(this.responseText); 
		    },
		    onerror: function(e){
		    	console.log(e);
		        Ti.API.debug(e.error);
		        alert('There was an error during the conection');
		    }
		    //timeout:1000,
			});	
			//Request the data from the web service, Here you have to change it for your local ip
			request.open("POST","http://williambergmans.nl/ggd/public/postVragenlijst");
			var params = ({"id": "0" ,"titel": titel, "vraag1": vraag1,"vraag2": vraag2, "vraag3": vraag3 ,"vraag4":vraag4 ,"vraag5": vraag5 });  
		    request.send(params); 
		    
		    alert(params);
		     
		    console.log(params);
 		}  
 		else{ 
 			alert("Please write something in the textbox");
 		}   
 

};




	

	


