import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Loading} from "./loadingDataFunctions";
import {Drawing} from "../gui/drawingFunctions";
import {GameState} from "../gameState";
import { MainBox } from "../gui/mainBox";

export namespace Authentication{
    import show = BoxVisibility.show;
    import hide = BoxVisibility.hide;

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
		logintime = 0;
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
					if (GameState.currentTurn.status === 'fi') {
						let btnToShow = document.getElementById("eventTabsButton");
						if(btnToShow!==null){
							show(btnToShow);
						}
						Loading.loadPendingEvents();
					}
				}
				// overwrite old known data
				Loading.getNewDataFromServer();
				logintime = 0;
				hide(GUI.getBigBox().getEventTabsButton());
				GUI.getBigBox().getEventsTab().innerHTML = "";
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
		show(GUI.getInfoBox().getSelf());
		hide(GUI.getLoginBox());
	}


	// logs out from Server, closes everything you need login for, deletes login time
	export function logoutFromServer() {
		//loging out from server
		$.post({
			url: url + "/databaseLink/logout/"
		});
		// turning off godmode Box, and changing infoBox to Login Box
		login = 'guest';
        BoxVisibility.switchBtnBoxTo(GUI.getButtonsBox());
        BoxVisibility.switchModeTo("none");
		// Hide gm functionalities
		hide(GUI.getGodModeBox().getSelf());
		hide(GUI.getToggleGMBarButton());
		hide(GUI.getInfoBox().getSelf());
		show(GUI.getLoginBox());
		//change the info change box, back to the normal info Box
		hide(GUI.getInfoChangeBox().getSelf());
		// forget old authenticationToken
		authenticationToken = 0;
		// overwrite previously known data
		Loading.getNewDataFromServer();
		logintime = 0;
		hide(GUI.getBigBox().getEventTabsButton());
		let eventList = GUI.getBigBox().getEventsTab();
		eventList.innerHTML = "";
		// TODO: closeTab function
		GUI.getBigBox().closeAllTabs();
		GameState.newEvents = [];
		GameState.loadedEvents = [];
		Drawing.writeTurnNumber();
	}
} 