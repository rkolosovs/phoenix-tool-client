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

import {GameState} from "../gameState";
import {BoxVisibility} from "./boxVisibilty";

export class MainBox{
    private self: HTMLDivElement;
    private eventTabsButton: HTMLButtonElement;
    private eventsTab: HTMLDivElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("infoBox") as HTMLDivElement;
        }
        return this.self;
    }

    getEventTabsButton(): HTMLButtonElement{
        if(this.eventTabsButton == undefined){
            this.eventTabsButton = document.getElementById("eventTabsButton") as HTMLButtonElement;
            // TODO couldnt figure out, what this button is exactly supposed to do
        }
        return this.eventTabsButton;
    }

    getEventsTab(): HTMLDivElement{
        if(this.eventsTab == undefined){
            this.eventsTab = document.getElementById("eventsTab") as HTMLDivElement;
        }
        return this.eventsTab;
    }

    closeAllTabs(): void {
        // Get all elements with class="tabcontent" and hide them
        let tabcontent: HTMLCollectionOf<Element> = document.getElementsByClassName("tabcontent");
        for (let i = 0; i < tabcontent.length; i++) {
            BoxVisibility.hide(tabcontent[i] as HTMLElement);
        }
        // Get all elements with class="tablinks" and remove the class "active"
        let tablinks: HTMLCollectionOf<Element> = document.getElementsByClassName("tablinks");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }

    openTab(event: Event, tab: HTMLDivElement): void {
        this.closeAllTabs();
        // Show the current tab, and add an "active" class to the button that opened the tab
        if (event != undefined && tab != undefined) {
            BoxVisibility.show(tab);
            (event.currentTarget as HTMLElement).className += " active";
        }
    }

    fillEventList() {
        let eventList = this.getEventsTab();
        eventList.innerHTML = "";
        for (let i = 0; i < GameState.loadedEvents.length; i++) {
            GameState.loadedEvents[i].determineEventStatus();
            eventList.appendChild(GameState.loadedEvents[i].makeEventListItem());
        }
    }
}