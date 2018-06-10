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
const gui_1 = require("../gui/gui");
const boxVisibilty_1 = require("../gui/boxVisibilty");
const loadingDataFunctions_1 = require("./loadingDataFunctions");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const gameState_1 = require("../gameState");
var Authentication;
(function (Authentication) {
    var show = boxVisibilty_1.BoxVisibility.show;
    var hide = boxVisibilty_1.BoxVisibility.hide;
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
                gameState_1.GameState.login = data.group;
                // if the user is a GM, godmode possibility is displayed
                if (gameState_1.GameState.login === 'sl') {
                    gui_1.GUI.getToggleGMBarButton().style.display = "";
                    if (gameState_1.GameState.currentTurn.status === 'fi') {
                        let btnToShow = document.getElementById("eventTabsButton");
                        if (btnToShow !== null) {
                            show(btnToShow);
                        }
                        loadingDataFunctions_1.Loading.loadPendingEvents();
                    }
                }
                // overwrite old known data
                loadingDataFunctions_1.Loading.getNewDataFromServer();
                Authentication.logintime = 0;
                hide(gui_1.GUI.getBigBox().getEventTabsButton());
                gui_1.GUI.getBigBox().getEventsTab().innerHTML = "";
                drawingFunctions_1.Drawing.writeTurnNumber();
            },
            error: (data) => {
                // alert for a failed login
                alert("Login failed and logged in as guest. Check username or password.");
                loadingDataFunctions_1.Loading.getNewDataFromServer();
            },
            dataType: "json"
        });
        // change loginBox to infoBox
        show(gui_1.GUI.getInfoBox().getSelf());
        hide(gui_1.GUI.getLoginBox());
    }
    Authentication.loginToServer = loginToServer;
    // logs out from Server, closes everything you need login for, deletes login time
    function logoutFromServer() {
        //loging out from server
        $.post({
            url: Authentication.url + "/databaseLink/logout/"
        });
        // turning off godmode Box, and changing infoBox to Login Box
        gameState_1.GameState.login = 'guest';
        boxVisibilty_1.BoxVisibility.switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        boxVisibilty_1.BoxVisibility.switchModeTo("none");
        // Hide gm functionalities
        hide(gui_1.GUI.getGodModeBox().getSelf());
        hide(gui_1.GUI.getToggleGMBarButton());
        hide(gui_1.GUI.getInfoBox().getSelf());
        show(gui_1.GUI.getLoginBox());
        //change the info change box, back to the normal info Box
        hide(gui_1.GUI.getInfoChangeBox().getSelf());
        // forget old authenticationToken
        Authentication.authenticationToken = 0;
        // overwrite previously known data
        loadingDataFunctions_1.Loading.getNewDataFromServer();
        Authentication.logintime = 0;
        hide(gui_1.GUI.getBigBox().getEventTabsButton());
        let eventList = gui_1.GUI.getBigBox().getEventsTab();
        eventList.innerHTML = "";
        gui_1.GUI.getBigBox().closeAllTabs();
        gameState_1.GameState.newEvents = [];
        gameState_1.GameState.loadedEvents = [];
        drawingFunctions_1.Drawing.writeTurnNumber();
    }
    Authentication.logoutFromServer = logoutFromServer;
})(Authentication = exports.Authentication || (exports.Authentication = {}));
//# sourceMappingURL=authenticationFunctions.js.map