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
const gameState_1 = require("../gameState");
const boxVisibilty_1 = require("./boxVisibilty");
class MainBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("infoBox");
        }
        return this.self;
    }
    getEventTabsButton() {
        if (this.eventTabsButton == undefined) {
            this.eventTabsButton = document.getElementById("eventTabsButton");
            // TODO couldnt figure out, what this button is exactly supposed to do
        }
        return this.eventTabsButton;
    }
    getEventsTab() {
        if (this.eventsTab == undefined) {
            this.eventsTab = document.getElementById("eventsTab");
        }
        return this.eventsTab;
    }
    closeAllTabs() {
        // Get all elements with class="tabcontent" and hide them
        let tabcontent = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            boxVisibilty_1.BoxVisibility.hide(tabcontent[i]);
        }
        // Get all elements with class="tablinks" and remove the class "active"
        let tablinks = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }
    openTab(event, tab) {
        this.closeAllTabs();
        // Show the current tab, and add an "active" class to the button that opened the tab
        if (event != undefined && tab != undefined) {
            boxVisibilty_1.BoxVisibility.show(tab);
            event.currentTarget.className += " active";
        }
    }
    fillEventList() {
        let eventList = this.getEventsTab();
        eventList.innerHTML = "";
        for (let i = 0; i < gameState_1.GameState.loadedEvents.length; i++) {
            gameState_1.GameState.loadedEvents[i].determineEventStatus();
            eventList.appendChild(gameState_1.GameState.loadedEvents[i].makeEventListItem());
        }
    }
}
exports.MainBox = MainBox;
//# sourceMappingURL=mainBox.js.map