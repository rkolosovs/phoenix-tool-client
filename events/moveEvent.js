"use strict";
class MoveEvent extends PhoenixEvent {
    constructor(id, type, status) {
        super(id, type, status);
        this.id = id;
        this.type = type;
        this.status = status;
    }
    checkEvent() {
    }
    determineEventStatus() {
    }
    makeEventListItem(i) {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + i;
        //TODO fill with individual listItem style
        return this.commonEventListItem(eli, i);
    }
}
