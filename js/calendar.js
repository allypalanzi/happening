var clientId = '1014651799520-qqic6pa07d46cjsokejf475qv2lee5ue.apps.googleusercontent.com';
var apiKey = 'AIzaSyCqlEywG09p3a2SM2tKULGBZnbfR2oyNsU';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
    checkAuth();
}

function checkAuth() {
    gapi.auth.authorize({
	client_id: clientId, 
	scope: scopes, 
	immediate: true
    }, handleAuthResult);
}

function handleAuthResult(authResult) {
    if(authResult && !authResult.error) {
	makeApiCall();
	alert("WOOOOO!");
    }
}

function handleAuthClick(event) {
    gapi.auth.authorize({
	client_id: clientId, 
	scope: scopes, 
	immediate: false
    }, handleAuthResult);
    return false;
}

function makeApiCall() {
    gapi.client.load('calendar', 'v3', function() {
	var request = gapi.client.calendar.events.list({
	    'calendarId': 'primary'
	});

	request.execute(function(resp) {
	    for (var i = 0; i <resp.items.length; i++) {
		console.log(resp.items[i].summary);
	    }
	});
    });
}