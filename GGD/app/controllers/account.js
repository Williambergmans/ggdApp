$.login.addEventListener('click', function(e) {
	
Alloy.Globals.Navigator.open('login', {displayHomeAsUp:true});
var login = Alloy.createController('login').getView();
    //login.open();  
 
});

$.register.addEventListener('click', function(e) {
	
	
Alloy.Globals.Navigator.open('register', {displayHomeAsUp:true});	
	
var register = Alloy.createController('register').getView();
    //register.open();  
 
});

$.gast.addEventListener('click', function(e) {
	
 alert('test');
 
});
 

