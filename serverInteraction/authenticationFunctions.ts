import {GUI} from "../gui/gui";
namespace Authentication{
	//put the url/IP for the remote game server here
	// export let url = "http://phoenixserver.h2610265.stratoserver.net"; // online server
    export let url: string = "http://localhost:8000"; // for local debug

    export let authenticationToken: number = 0; // the session Token, default = 0.
    export let currentCSRFToken: any; //TODO

	export let logintime: number;

	// function to get the authenticationToken from the server and save a login time
	export function loginToServer() {
		let username = (document.getElementById("loginName") as HTMLInputElement).value;
		let password = (document.getElementById("loginPassword") as HTMLInputElement).value;
		// Request to server with username and password in plaintext
		// TODO: make safe
		logintime = undefined;
		$.post({
			url: url + "/databaseLink/login/",
			data: {
				username: username,
				password: password
			},
			success: function(data) {
				// saving the authenticationToken
				authenticationToken = data.token;
				login = data.group;
				// if the user is a GM, godmode possibility is displayed
				if (login === 'sl') {
					GUI.getToggleGMBarButton().style.display = "";
					if (currentTurn.status === 'fi') {
						show(document.getElementById("eventTabsButton"));
						Loading.loadPendingEvents();
					}
				}
				// overwrite old known data
				Loading.getNewDataFromServer();
				logintime = undefined;
				hide(document.getElementById("eventTabsButton"));
				let eventList = document.getElementById("eventsTab");
				eventList.innerHTML = "";
				Drawing.writeTurnNumber();
			},
			error: function(data){
				// alert for a failed login
				alert("Login failed and logged in as guest. Check username or password.");
				Loading.getNewDataFromServer();
			},
			dataType: "json"
		});
		// change loginBox to infoBox
		document.getElementById("infoBox").style.display = "";
		document.getElementById("loginBox").style.display = "none";
	}


	// logs out from Server, closes everything you need login for, deletes login time
	export function logoutFromServer() {
		//loging out from server
		$.post({
			url: url + "/databaseLink/logout/"
		});
		// turning off godmode Box, and changing infoBox to Login Box
		login = 'guest';
		switchBtnBoxTo(GUI.getButtonsBox());
		switchModeTo("none");
		// Hide gm functionalities
		document.getElementById("godmodeBox").style.visibility = "hidden";
		document.getElementById("ToggleGodModeBar").style.display = "none";
		document.getElementById("infoBox").style.display = "none";
		document.getElementById("loginBox").style.display = "";
		//change the info change box, back to the normal info Box
		document.getElementById("infoChangeBox").style.display = "none"
		// forget old authenticationToken
		authenticationToken = 0;
		// overwrite previously known data
		Loading.getNewDataFromServer();
		logintime = undefined;
		hide(document.getElementById("eventTabsButton"));
		let eventList = document.getElementById("eventsTab");
		eventList.innerHTML = "";
		openTab(null, "");
		GameState.pendingNewEvents = [];
		preparedEvents = [];
		Drawing.writeTurnNumber();
	}
}