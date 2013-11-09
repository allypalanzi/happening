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
	    var widgets = $(".widgets");
	    widgets.append(
		"<div class='calendar widget'>" +
		    "<h1 class='widget-header'>Upcoming Events</h1>"+
		    "<ul class='calendar-list'>" +
		    "</ul>" +
		    "</div>"
	    );
	    var calendarList = $(".calendar-list");
	    for (var i = 0; i <resp.items.length; i++) {
		var eventTitle = resp.items[i].summary;
		var eventDateTime = new Date(resp.items[i].start.dateTime);
		var eventDate = new Date(resp.items[i].start.date);
		var calElement;
		if (eventDateTime == undefined) {
		    calElement = "<li><p class='title'>" +
			eventTitle +
			"</p><p class='date'>" +
			eventDate.toDateString() +
			"</p></li>";
		} else {
		    calElement = "<li><p class='title'>" +
			eventTitle +
			"</p><p class='date'>" + 
			eventDateTime.toDateString() + 
			" " +
			eventDateTime.toLocaleTimeString() +
			"</p></li>";
		}
		calendarList.append(calElement);
	    }
	});
    });
}