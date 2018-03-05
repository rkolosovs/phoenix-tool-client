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