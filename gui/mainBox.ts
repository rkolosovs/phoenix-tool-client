import {GameState} from "../gameState";

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

    openTab(event: Event, tab: HTMLDivElement) {
        // Declare all variables
        let i, tabcontent, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            hide(tabcontent[i] as HTMLElement);
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        if (event != undefined && tab != undefined) {
            show(tab);
            (event.currentTarget as HTMLElement).className += " active";
        }
    }

    fillEventList() {
        let eventList = this.getEventsTab();
        eventList.innerHTML = "";
        for (let i = 0; i < GameState.pendingNewEvents.length; i++) {
            GameState.pendingNewEvents[i].determineEventStatus();
            eventList.appendChild(GameState.pendingNewEvents[i].makeEventListItem());
        }
    }
}