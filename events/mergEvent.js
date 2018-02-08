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
        for (let i = 0; i < listOfArmies.length; i++) {
            if (listOfArmies[i].armyId == armyFromId && listOfArmies[i].owner == realm) {
                armyFromPlaceInList = i;
                console.log("i1=" + i);
            }
            else if (listOfArmies[i].armyId == armyToId && listOfArmies[i].owner == realm) {
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
        let army1 = listOfArmies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        let army2 = listOfArmies[this.findArmyPlaceInList(this.toArmy, this.realm)];
        if (army1 == undefined || army2 == undefined) {
            this.status = 'withheld';
        }
        else if (army1.x !== this.x || army1.y !== this.y || army2.x !== this.x || army2.y !== this.y) {
            this.status = 'withheld';
        }
        else if (army1.armyType() === army2.armyType() &&
            army1.x === army2.x && army1.y === army2.y) {
            this.status = 'available';
        }
        else if ((army1.armyType() !== army2.armyType()) ||
            ((((army1.armyType() === 1 || army1.armyType() === 2) && army1.remainingMovePoints < 3) ||
                army1.armyType() === 3 && army1.remainingMovePoints < 5) && (((army2.armyType() === 1 || army2.armyType() === 2) &&
                army2.remainingMovePoints < 3) || army2.armyType() === 3 && army2.remainingMovePoints < 5))) {
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
