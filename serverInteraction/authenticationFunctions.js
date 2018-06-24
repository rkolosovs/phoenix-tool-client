"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
var Authentication;
(function (Authentication) {
    var show = types_1.BoxVisibility.show;
    var hide = types_1.BoxVisibility.hide;
    //put the url/IP for the remote game server here
    // export let url = "http://phoenixserver.h2610265.stratoserver.net"; // online server
    Authentication.url = "http://localhost:8000"; // for local debug
    Authentication.authenticationToken = 0; // the session Token, default = 0.
    // function to get the authenticationToken from the server and save a login time
    function loginToServer() {
        let username = document.getElementById("loginName").value;
        let password = document.getElementById("loginPassword").value;
        // Request to server with username and password in plaintext
        // TODO: make safe
        Authentication.logintime = 0;
        $.post({
            url: Authentication.url + "/databaseLink/login/",
            data: {
                username: username,
                password: password
            },
            success: (data) => {
                // saving the authenticationToken
                Authentication.authenticationToken = data.token;
                types_1.GameState.login = data.group;
                // if the user is a GM, godmode possibility is displayed
                if (types_1.GameState.login === 'sl') {
                    types_1.GUI.getToggleGMBarButton().style.display = "";
                    if (types_1.GameState.currentTurn.status === 'fi') {
                        let btnToShow = document.getElementById("eventTabsButton");
                        if (btnToShow !== null) {
                            show(btnToShow);
                        }
                        types_1.Loading.loadPendingEvents();
                    }
                }
                // overwrite old known data
                types_1.Loading.getNewDataFromServer();
                Authentication.logintime = 0;
                hide(types_1.GUI.getBigBox().getEventTabsButton());
                types_1.GUI.getBigBox().getEventsTab().innerHTML = "";
                types_1.Drawing.writeTurnNumber();
            },
            error: (data) => {
                // alert for a failed login
                alert("Login failed and logged in as guest. Check username or password.");
                types_1.Loading.getNewDataFromServer();
            },
            dataType: "json"
        });
        // change loginBox to infoBox
        show(types_1.GUI.getInfoBox().getSelf());
        hide(types_1.GUI.getLoginBox());
    }
    Authentication.loginToServer = loginToServer;
    // logs out from Server, closes everything you need login for, deletes login time
    function logoutFromServer() {
        //loging out from server
        $.post({
            url: Authentication.url + "/databaseLink/logout/"
        });
        // turning off godmode Box, and changing infoBox to Login Box
        types_1.GameState.login = 'guest';
        types_1.BoxVisibility.switchBtnBoxTo(types_1.GUI.getButtonsBox());
        types_1.BoxVisibility.switchModeTo("none");
        // Hide gm functionalities
        hide(types_1.GUI.getGodModeBox().getSelf());
        hide(types_1.GUI.getToggleGMBarButton());
        hide(types_1.GUI.getInfoBox().getSelf());
        show(types_1.GUI.getLoginBox());
        //change the info change box, back to the normal info Box
        hide(types_1.GUI.getInfoChangeBox().getSelf());
        // forget old authenticationToken
        Authentication.authenticationToken = 0;
        // overwrite previously known data
        types_1.Loading.getNewDataFromServer();
        Authentication.logintime = 0;
        hide(types_1.GUI.getBigBox().getEventTabsButton());
        let eventList = types_1.GUI.getBigBox().getEventsTab();
        eventList.innerHTML = "";
        types_1.GUI.getBigBox().closeAllTabs();
        types_1.GameState.newEvents = [];
        types_1.GameState.loadedEvents = [];
        types_1.Drawing.writeTurnNumber();
    }
    Authentication.logoutFromServer = logoutFromServer;
})(Authentication = exports.Authentication || (exports.Authentication = {}));
//# sourceMappingURL=authenticationFunctions.js.map