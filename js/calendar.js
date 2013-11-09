var clientId = '309869438810.apps.googleusercontent.com';
var apiKey =  'AIzaSyCIe6DUX_0MslcYYYUQf-8lH0CE4_e5Uvk';
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
	var today = new Date();
	var request = gapi.client.calendar.events.list({
	    "calendarId": "primary",
	    "singleEvents": true,
	    "orderBy": "startTime",
	    "timeMin": today.toISOString(),
	    "maxResults": 4
	});

	request.execute(function(resp) {
	    var calendarList = $(".calendar");
	    for (var i = 0; i <resp.items.length; i++) {
		var eventTitle = resp.items[i].summary;
		var eventDate = resp.items[i].start.dateTime;
		var calElement = "<li><p>" +
			eventTitle +
			"</p><p>" + 
			eventDate +
			"</p></li>";
		calendarList.appendChild(calElement);

	    }
	});
    });
}