/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Loading} from "./loadingDataFunctions";
import {Drawing} from "../gui/drawingFunctions";
import {GameState} from "../gameState";

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
			success: (data: any) => {
				// saving the authenticationToken
				authenticationToken = data.token;
				GameState.login = data.group;
				// if the user is a GM, godmode possibility is displayed
				if (GameState.login === 'sl') {
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
			error: (data: any) => {
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
		GameState.login = 'guest';
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
		GUI.getBigBox().closeAllTabs();
		GameState.newEvents = [];
		GameState.loadedEvents = [];
		Drawing.writeTurnNumber();
	}
} 