/**
 * Instantiate the variables assocaited with this controller
 */
var _args = arguments[0] || {},
	vraag1Antwoord = null,
	vraag2Antwoord = null,
	vraag3Antwoord = null,
	vraag4Antwoord = null,
	vraag5Antwoord = null,
	mail = null ;	  // FavoritesManager helper class for managing favorites

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




function createMailView() {
	
	
	 
var myModal = Ti.UI.createWindow({
    title           : 'My Modal',
    backgroundColor : 'transparent',
}); 
    
    
if (OS_ANDROID) {
    myModal.addEventListener('open',function(evt){
    var actionBar=evt.source.activity.actionBar;
    if (actionBar){
       actionBar.hide();
    }
}); 
}
  
    
var wrapperView    = Ti.UI.createView({
	
}); // Full screen
 
var backgroundView = Ti.UI.createView({  // Also full screen
    backgroundColor : '#000',
    opacity: 0.5,

});

if (OS_IOS) {

var containerView  = Ti.UI.createView({  // Set height appropriately
    backgroundColor : '#FFF',
    height: 200, 
    top: 65
});
}
if (OS_ANDROID) {

var containerView  = Ti.UI.createView({  // Set height appropriately
    backgroundColor : '#FFF',
    height: 200, 
    top: 50
});
}  


 
var titleLabel = Ti.UI.createLabel({
  color: '#000',
  font: { fontSize:18 },
  text: 'Mail',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 10,
  width: Ti.UI.SIZE, height: Ti.UI.SIZE
});


var separatorTop = Ti.UI.createView ({
	top:40,
	height: 2,
	width: "100%",
	backgroundColor:"#e5e5e5",
    zIndex: 1,
});

var separatorBottom = Ti.UI.createView ({
	top:160,
	height: 2,
	width: "100%",
	backgroundColor:"#e5e5e5"
});


var fieldTitle = Ti.UI.createTextArea({
  color: '#888',
  font: {fontSize:20, fontWeight:'bold'},
  textAlign: 'left',
  value: '',
  height : 120,
  left:10,
  right:10
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
		if(fieldTitle.value != null)
{	
	 mail = fieldTitle;	
	 myModal.close(); 
	 createPhoneView();
	 
	   
}
	
    myModal.close();
});
submitButton.addEventListener('click', function () {
	
	if(fieldTitle.value != null)
{	 
	
	 mail = fieldTitle;
	 

	 myModal.close();
	 
	   	   	
        	var titel = $.titel.text;
	var vraag1 = $.vraag1Titel.text + " " + vraag1Antwoord;
	var vraag2 = $.vraag2Titel.text + " " + vraag2Antwoord;
	var vraag3 = $.vraag3Titel.text + " " + vraag3Antwoord;
	var vraag4 = $.vraag4Titel.text + " " + vraag4Antwoord;
	var vraag5 = $.vraag5Titel.text + " " + vraag5Antwoord;	
	
	
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
			var params = ({"id": "0" ,"titel": titel, "vraag1": vraag1,"vraag2": vraag2, "vraag3": vraag3 ,"vraag4":vraag4 ,"vraag5": vraag5 ,"mail": mail.value});  
		    request.send(params); 
		     
		    console.log(params);
 		}  
 		else{ 
 			alert("Please write something in the textbox");
 		}   
	  	 $.wrapper.close(); 
	 
	 
	 
	 
	 
	 
		 
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










function validateAndSave(){
	
	
	var dialog = Ti.UI.createAlertDialog({
        title : 'Wilt u uw mail adress achterlaten indien we contact met u willen opnemen?',
        buttonNames : ['Ja','Nee']
    });
    dialog.addEventListener('click', function(e){
    	// wanneer ja
        if(e.index == 0){
           createMailView();
           
           
        }
        else
        {
        	   	
        	var titel = $.titel.text;
	var vraag1 = $.vraag1Titel.text + " " + vraag1Antwoord;
	var vraag2 = $.vraag2Titel.text + " " + vraag2Antwoord;
	var vraag3 = $.vraag3Titel.text + " " + vraag3Antwoord;
	var vraag4 = $.vraag4Titel.text + " " + vraag4Antwoord;
	var vraag5 = $.vraag5Titel.text + " " + vraag5Antwoord;	
	
	
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
			var params = ({"id": "0" ,"titel": titel, "vraag1": vraag1,"vraag2": vraag2, "vraag3": vraag3 ,"vraag4":vraag4 ,"vraag5": vraag5});  
		    request.send(params); 
		     
		    console.log(params);
 		}  
 		else{ 
 			alert("Please write something in the textbox");
 		}   
        	
        	 $.wrapper.close(); 
        } 
        
     
        	
        	
        	
        	
        	
        
    });
    dialog.show(); 
    
	
	
	
	/*

	
 */

};




	

	


