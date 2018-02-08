"use strict";
class SplitEvent extends PhoenixEvent {
    constructor(id, type, status, fromArmy, newArmy, realm, troops, leaders, mounts, lkp, skp, x, y) {
        super(id, type, status);
        this.id = id;
        this.type = type;
        this.status = status;
        this.fromArmy = fromArmy;
        this.newArmy = newArmy;
        this.realm = realm;
        this.troops = troops;
        this.leaders = leaders;
        this.mounts = mounts;
        this.lkp = lkp;
        this.skp = skp;
        this.x = x;
        this.y = y;
    }
    checkEvent() {
        console.log("this is a split event");
        let armyFromPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let newArmyId = this.newArmy;
        let realm = this.realm;
        let toSplit = this.troops;
        let leadersToSplit = this.leaders;
        let mountsToSplit = this.mounts;
        let lkpToSplit = this.lkp;
        let skpToSplit = this.skp;
        for (let i = 0; i < listOfArmies.length; i++) {
            if (listOfArmies[i].armyId === armyFromId && listOfArmies[i].owner === realm) {
                armyFromPlaceInList = i;
            }
        }
        if (armyFromPlaceInList >= 0) {
            listOfArmies[armyFromPlaceInList].count -= toSplit;
            listOfArmies[armyFromPlaceInList].leaders -= leadersToSplit;
            if (listOfArmies[armyFromPlaceInList].armyType == 1) {
                listOfArmies[armyFromPlaceInList].mounts -= mountsToSplit;
            }
            if (listOfArmies[armyFromPlaceInList].armyType == 1 || listOfArmies[armyFromPlaceInList].armyType == 3) {
                listOfArmies[armyFromPlaceInList].lkp -= lkpToSplit;
                listOfArmies[armyFromPlaceInList].skp -= skpToSplit;
            }
            let army = null;
            if (Math.floor(newArmyId / 100) == 1) {
                army = new FootArmy(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false, listOfArmies[armyFromPlaceInList].x, listOfArmies[armyFromPlaceInList].y, realm);
            }
            else if (Math.floor(newArmyId / 100) == 2) {
                army = new RiderArmy(newArmyId, toSplit, leadersToSplit, false, listOfArmies[armyFromPlaceInList].x, listOfArmies[armyFromPlaceInList].y, realm);
            }
            else if (Math.floor(newArmyId / 100) == 3) {
                army = new Fleet(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, false, listOfArmies[armyFromPlaceInList].x, listOfArmies[armyFromPlaceInList].y, realm);
            }
            army.setRemainingMovePoints(listOfArmies[armyFromPlaceInList].remainingMovePoints);
            army.setRemainingHeightPoints(listOfArmies[armyFromPlaceInList].remainingHeightPoints);
            listOfArmies.push(army);
        }
        this.status = 'checked';
        fillEventList();
        Drawing.drawStuff();
    }
    determineEventStatus() {
        let typefactor = 1;
        let army = listOfArmies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = 'withheld';
        }
        else {
            if (army.armyType() === 2) {
                typefactor = 2;
            }
            else if (army.armyType() === 3) {
                typefactor = 100;
            }
            console.log(army.count - this.troops);
            if (army.x != this.x || army.y != this.y) {
                this.status = 'withheld';
            }
            else if (((army.count - this.troops) >= (100 / typefactor)) &&
                ((army.leaders - this.leaders) >= 1) &&
                ((army.mounts - this.mounts) >= 0) &&
                ((army.lkp - this.lkp) >= 0) &&
                ((army.skp - this.skp) >= 0)) {
                this.status = 'available';
            }
            else {
                this.status = 'impossible';
            }
        }
    }
    makeEventListItem() {
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        // TODO: detailed explanation
        let innerHTMLString = "<div>" + this.realm.tag + "'s army " + this.fromArmy + " splits off army " + this.newArmy + " with ";
        if (this.troops !== 0) {
            innerHTMLString += this.troops + " troops, ";
        }
        if (this.leaders !== 0) {
            innerHTMLString += this.leaders + " leaders, ";
        }
        if (this.mounts !== 0) {
            innerHTMLString += this.mounts + " mounts, ";
        }
        if (this.lkp !== 0) {
            innerHTMLString += this.lkp + " lkp, ";
        }
        if (this.skp !== 0) {
            innerHTMLString += this.skp + " skp ";
        }
        innerHTMLString += "in (" + this.x + "," + this.y + ").</div>";
        eli.innerHTML = innerHTMLString;
        return this.commonEventListItem(eli, this.id);
    }
}
