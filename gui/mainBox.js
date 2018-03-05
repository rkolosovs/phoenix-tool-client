"use strict";
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
