"use strict";
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
        Authentication.logintime = undefined;
        $.post({
            url: Authentication.url + "/databaseLink/login/",
            data: {
                username: username,
                password: password
            },
            success: function (data) {
                // saving the authenticationToken
                Authentication.authenticationToken = data.token;
                login = data.group;
                // if the user is a GM, godmode possibility is displayed
                if (login === 'sl') {
                    gui_1.GUI.getToggleGMBarButton().style.display = "";
                    if (currentTurn.status === 'fi') {
                        show(document.getElementById("eventTabsButton"));
                        loadingDataFunctions_1.Loading.loadPendingEvents();
                    }
                }
                // overwrite old known data
                loadingDataFunctions_1.Loading.getNewDataFromServer();
                Authentication.logintime = undefined;
                hide(document.getElementById("eventTabsButton"));
                let eventList = document.getElementById("eventsTab");
                eventList.innerHTML = "";
                drawingFunctions_1.Drawing.writeTurnNumber();
            },
            error: function (data) {
                // alert for a failed login
                alert("Login failed and logged in as guest. Check username or password.");
                loadingDataFunctions_1.Loading.getNewDataFromServer();
            },
            dataType: "json"
        });
        // change loginBox to infoBox
        document.getElementById("infoBox").style.display = "";
        document.getElementById("loginBox").style.display = "none";
    }
    Authentication.loginToServer = loginToServer;
    // logs out from Server, closes everything you need login for, deletes login time
    function logoutFromServer() {
        //loging out from server
        $.post({
            url: Authentication.url + "/databaseLink/logout/"
        });
        // turning off godmode Box, and changing infoBox to Login Box
        login = 'guest';
        boxVisibilty_1.BoxVisibility.switchBtnBoxTo(gui_1.GUI.getButtonsBox());
        boxVisibilty_1.BoxVisibility.switchModeTo("none");
        // Hide gm functionalities
        document.getElementById("godmodeBox").style.visibility = "hidden";
        document.getElementById("ToggleGodModeBar").style.display = "none";
        document.getElementById("infoBox").style.display = "none";
        document.getElementById("loginBox").style.display = "";
        //change the info change box, back to the normal info Box
        document.getElementById("infoChangeBox").style.display = "none";
        // forget old authenticationToken
        Authentication.authenticationToken = 0;
        // overwrite previously known data
        loadingDataFunctions_1.Loading.getNewDataFromServer();
        Authentication.logintime = undefined;
        hide(document.getElementById("eventTabsButton"));
        let eventList = document.getElementById("eventsTab");
        eventList.innerHTML = "";
        openTab(null, "");
        gameState_1.GameState.pendingNewEvents = [];
        preparedEvents = [];
        drawingFunctions_1.Drawing.writeTurnNumber();
    }
    Authentication.logoutFromServer = logoutFromServer;
})(Authentication = exports.Authentication || (exports.Authentication = {}));
