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
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() === armyFromId && GameState.armies[i].owner === realm) {
                armyFromPlaceInList = i;
            }
        }
        if (armyFromPlaceInList >= 0) {
            let armyToSplitFrom = GameState.armies[armyFromPlaceInList];
            armyToSplitFrom.setTroopCount(armyToSplitFrom.getTroopCount() - toSplit);
            armyToSplitFrom.setOfficerCount(armyToSplitFrom.getOfficerCount() - leadersToSplit);
            if (armyToSplitFrom instanceof FootArmy) {
                armyToSplitFrom.setMountCount(armyToSplitFrom.getMountCount() - mountsToSplit);
            }
            if (armyToSplitFrom instanceof FootArmy || armyToSplitFrom instanceof Fleet) {
                armyToSplitFrom.setLightCatapultCount(armyToSplitFrom.getLightCatapultCount() - lkpToSplit);
                armyToSplitFrom.setHeavyCatapultCount(armyToSplitFrom.getHeavyCatapultCount() - skpToSplit);
            }
            let army;
            if (Math.floor(newArmyId / 100) === 1) {
                army = new FootArmy(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints());
                // new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false,
                // GameState.armies[armyFromPlaceInList].x, GameState.armies[armyFromPlaceInList].y, realm);
            }
            else if (Math.floor(newArmyId / 100) === 2) {
                army = new RiderArmy(newArmyId, realm, toSplit, leadersToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints(), armyToSplitFrom.getHeightPoints());
                // new reiterHeer(newArmyId, toSplit, leadersToSplit, false, GameState.armies[armyFromPlaceInList].x,
                // GameState.armies[armyFromPlaceInList].y, realm);
            }
            else if (Math.floor(newArmyId / 100) === 3) {
                army = new Fleet(newArmyId, realm, toSplit, leadersToSplit, lkpToSplit, skpToSplit, armyToSplitFrom.getPosition(), armyToSplitFrom.getMovePoints());
                // new seeHeer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, false,
                // GameState.armies[armyFromPlaceInList].x, GameState.armies[armyFromPlaceInList].y, realm);
            }
            GameState.armies.push(army);
        }
        this.status = 'checked';
        fillEventList();
        Drawing.drawStuff();
    }
    determineEventStatus() {
        let typefactor = 1;
        let army = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = 'withheld';
        }
        else {
            let mountCount = 0;
            let lkpCount = 0;
            let skpCount = 0;
            if (army instanceof RiderArmy) {
                typefactor = 2;
            }
            else if (army instanceof Fleet) {
                typefactor = 100;
                lkpCount = army.getLightCatapultCount();
                skpCount = army.getHeavyCatapultCount();
            }
            else if (army instanceof FootArmy) {
                mountCount = army.getMountCount();
                lkpCount = army.getLightCatapultCount();
                skpCount = army.getHeavyCatapultCount();
            }
            if (army.getPosition()[0] != this.x || army.getPosition()[1] != this.y) {
                this.status = 'withheld';
            }
            else if (((army.getTroopCount() - this.troops) >= (100 / typefactor)) &&
                ((army.getOfficerCount() - this.leaders) >= 1) &&
                ((mountCount - this.mounts) >= 0) &&
                ((lkpCount - this.lkp) >= 0) &&
                ((skpCount - this.skp) >= 0)) {
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
