window.fbAsyncInit = function() {
    FB.init({
	appId      : 537281419679469, // App ID
	channelUrl : 'https://allypalanzi.github.io/happening', // Channel File
	status     : true, // check login status
	cookie     : true, // enable cookies to allow the server to access the session
	xfbml      : true  // parse XFBML
    });

    
    FB.Event.subscribe('auth.authResponseChange', function(response) {
	if (response.status === 'connected') {
	    testAPI();
	} else if (response.status === 'not_authorized') {
	    FB.login();
	} else {
	    FB.login();
	}
    });
};

(function(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));


function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api("me/notifications?limit=0", function(response){
	var widgets = $(".widgets");
	widgets.append(
	    "<div class='facebook widget'>" +
		"<h1 class='widget-header'>Facebook</h1>"+
		"<p class='notifs'>You have " +
		"<span class='notifs'>" +
		response.summary.unseen_count +
		"</span>" +
		" notifications.</p>" +
		"</div>"
	);
    });
}

window.fbAsyncInit();
