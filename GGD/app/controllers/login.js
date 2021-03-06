/**
 * @author William Bergmans - not used in demo!
 */
var loginReq = Titanium.Network.createHTTPClient();
 
$.loginButton.addEventListener('click',function(e)
{
	var username = $.username;
	var password = $.password;
		
    if (username.value != '' && password.value != '') 
    {
        loginReq.open("POST","http://localhost:8888/post_auth.php");
        var params = {
            username: username.value,
            password: Ti.Utils.md5HexDigest(password.value)
        };
        loginReq.send(params);
        
    }
    else
    {
        alert("Username/Password are required");
    }
});


loginReq.onload = function()
{
	
	var username = $.username;
	var password = $.password;
	
    var json = this.responseText;
    var response = JSON.parse(json);
    if (response.logged == true)
    {
        username.blur();
        password.blur(); 
        Ti.App.fireEvent('grantEntrance', {
            name:response.name,
            email:response.email
        });
       $.login.close();
    }
    else
    {
        alert(response.message);
    }
};
 


