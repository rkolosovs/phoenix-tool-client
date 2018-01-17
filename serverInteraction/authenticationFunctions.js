'use strict';
// function to get the authenticationToken from the server and save a login time
function loginToServer() {
    var username = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;
    // Request to server with username and password in plaintext
    // TODO: make safe
    loginZeit = undefined;
    $.post({
        url: url + "/databaseLink/login/",
        data: {
            username: username,
            password: password
        },
        success: function (data) {
            // saving the authenticationToken
            authenticationToken = data.token;
            login = data.group;
            // if the user is a GM, godmode possibility is displayed
            if (login === 'sl') {
                GUI.getToggleGMBarButton().style.display = "";
                if (currentTurn.status === 'fi') {
                    show(document.getElementById("eventTabsButton"));
                    loadPendingEvents();
                }
            }
            // overwrite old known data
            getNewDataFromServer();
            loginZeit = undefined;
            //delete Multifield Data
            listOfMultiArmyFields = [];
            hide(document.getElementById("eventTabsButton"));
            var eventList = document.getElementById("eventsTab");
            eventList.innerHTML = "";
            writeTurnNumber();
        },
        error: function (data) {
            // alert for a failed login
            alert("Login failed and logged in as guest. Check username or password.");
            getNewDataFromServer();
        },
        dataType: "json"
    });
    // change loginBox to infoBox
    document.getElementById("infoBox").style.display = "";
    document.getElementById("loginBox").style.display = "none";
}
// logs out from Server, closes everything you need login for, deletes login time
function logoutFromServer() {
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
    document.getElementById("infoChangeBox").style.display = "none";
    // forget old authenticationToken
    authenticationToken = 0;
    // overwrite previously known data
    getNewDataFromServer();
    loginZeit = undefined;
    hide(document.getElementById("eventTabsButton"));
    var eventList = document.getElementById("eventsTab");
    eventList.innerHTML = "";
    openTab(null, "");
    pendingEvents = [];
    preparedEvents = [];
    writeTurnNumber();
}
