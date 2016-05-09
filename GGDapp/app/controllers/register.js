var testresults;
 
function checkemail(emailAddress)
{
    var str = emailAddress;
    var filter = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (filter.test(str))
    {
        testresults = true;
    }
    else
    {
        testresults = false;
    }
    return (testresults);
};
 
var createReq = Titanium.Network.createHTTPClient();
createReq.onload = function()
{
    if (this.responseText == "Insert failed" || this.responseText == "That username or email already exists")
    {
        $.registerButton.enabled = true;
        $.registerButton.opacity = 1;
        alert(this.responseText);
    } 
    else
    {
        var alertDialog = Titanium.UI.createAlertDialog({
            title: 'Alert',
            message: this.responseText,
            buttonNames: ['OK']
        });
        alertDialog.show();
        alertDialog.addEventListener('click',function(e)
        {
          	 Alloy.Globals.Navigator.open('index', {displayHomeAsUp:true});  
        });
    }
};
 
$.registerButton.addEventListener('click',function(e)
{
	
	var username = $.username;
	var password1 = $.password1;
	var password2 = $.password2;
    var names = $.name;
    var email = $.email; 
	
	
	
	
  if (username.value != '' && password1.value != '' && password2.value != '' && names.value != '' && email.value != '')
    {
        if (password1.value != password2.value)
        {
            alert("Your passwords do not match");
        }
        else
        {
            if (!checkemail(email.value))
            {
                alert("Please enter a valid email");
            }
            else
            {
               $.registerButton.enabled = false;
                $.registerButton.opacity = 0.3;
                createReq.open("POST","http://localhost:8888/post_register.php");
                var params = {
                    username: username.value,
                    password: Ti.Utils.md5HexDigest(password1.value),
                    names: names.value,
                    email: email.value
                };
                createReq.send(params);
            }
        }
    }
    else
    {
        alert("All fields are required");
    }
});