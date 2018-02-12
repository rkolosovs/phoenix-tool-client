"use strict";
class MergeEvent extends PhoenixEvent {
    constructor(id, type, status, fromArmy, toArmy, realm, x, y) {
        super(id, type, status);
        this.id = id;
        this.type = type;
        this.status = status;
        this.fromArmy = fromArmy;
        this.toArmy = toArmy;
        this.realm = realm;
        this.x = x;
        this.y = y;
    }
    checkEvent() {
        let armyFromPlaceInList = -1;
        let armyToPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let armyToId = this.toArmy;
        let realm = this.realm;
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() == armyFromId && GameState.armies[i].owner == realm) {
                armyFromPlaceInList = i;
                console.log("i1=" + i);
            }
            else if (GameState.armies[i].getErkenfaraID() == armyToId && GameState.armies[i].owner == realm) {
                armyToPlaceInList = i;
                console.log("i2=" + i);
            }
        }
        if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
            selectedArmyIndex = armyFromPlaceInList;
            mergeSelectedArmy(armyToPlaceInList);
            preparedEvents.pop();
        }
        this.status = 'checked';
        fillEventList();
        Drawing.drawStuff();
        selectedArmyIndex = undefined;
    }
    determineEventStatus() {
        let army1 = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        let army2 = GameState.armies[this.findArmyPlaceInList(this.toArmy, this.realm)];
        if (army1 == undefined || army2 == undefined) {
            this.status = 'withheld';
        }
        else if (army1.getPosition()[0] !== this.x || army1.getPosition()[1] !== this.y ||
            army2.getPosition()[0] !== this.x || army2.getPosition()[1] !== this.y) {
            this.status = 'withheld';
        }
        else if (army1.constructor === army2.constructor &&
            army1.getPosition()[0] === army2.getPosition()[0] && army1.getPosition()[1] === army2.getPosition()[1]) {
            this.status = 'available';
        }
        else if ((army1.constructor !== army2.constructor) ||
            ((((army1 instanceof FootArmy || army1 instanceof RiderArmy) && army1.getMovePoints() < 3) ||
                army1 instanceof Fleet && army1.getMovePoints() < 5) && (((army2 instanceof FootArmy || army2 instanceof RiderArmy) &&
                army2.getMovePoints() < 3) || army2 instanceof Fleet && army2.getMovePoints() < 5))) {
            this.status = 'impossible';
        }
        else {
            this.status = 'withheld';
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        eli.innerHTML = "<div>" + this.realm.tag + "'s army " + this.fromArmy + " merges with army " + this.toArmy +
            " in (" + this.x + "," + this.y + ").</div>";
        return this.commonEventListItem(eli, this.id);
    }
}
