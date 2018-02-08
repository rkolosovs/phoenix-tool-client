class TransferEvent extends PhoenixEvent{
    
    constructor(protected id: number, protected type: string, protected status: string, protected fromArmy: number,
        protected toArmy: number, protected realm: Realm, protected troops: number, protected leaders: number,
        protected mounts: number, protected lkp: number, protected skp: number, protected x: number, protected y: number){

        super(id, type, status);
    }

    checkEvent(): void{
        console.log("this is a transfer event");
        let armyFromPlaceInList = -1;
        let armyToPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let armyToId = this.toArmy;
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
            else if (listOfArmies[i].armyId === armyToId && listOfArmies[i].owner === realm) {
                armyToPlaceInList = i;
            }
        }
        if (armyFromPlaceInList >= 0 && armyToPlaceInList >= 0) {
            listOfArmies[armyFromPlaceInList].count -= toSplit;
            listOfArmies[armyToPlaceInList].count += toSplit;
            listOfArmies[armyFromPlaceInList].leaders -= leadersToSplit;
            listOfArmies[armyToPlaceInList].leaders += leadersToSplit;
            if (listOfArmies[armyFromPlaceInList].armyType == 1) {
                listOfArmies[armyFromPlaceInList].mounts -= mountsToSplit;
                listOfArmies[armyToPlaceInList].mounts += mountsToSplit;
            }
            if (listOfArmies[armyFromPlaceInList].armyType == 1 || listOfArmies[armyFromPlaceInList].armyType == 3) {
                listOfArmies[armyFromPlaceInList].lkp -= lkpToSplit;
                listOfArmies[armyToPlaceInList].lkp += lkpToSplit;
                listOfArmies[armyFromPlaceInList].skp -= skpToSplit;
                listOfArmies[armyToPlaceInList].skp += skpToSplit;
            }
            if (leadersToSplit > 0 &&
                listOfArmies[armyFromPlaceInList].remainingMovePoints < listOfArmies[armyFromPlaceInList].startingMovepoints) {
                listOfArmies[armyToPlaceInList].setRemainingMovePoints(0);
            } else if (listOfArmies[armyFromPlaceInList].remainingMovePoints < listOfArmies[armyToPlaceInList].remainingMovePoints) {
                listOfArmies[armyToPlaceInList].setRemainingMovePoints(listOfArmies[armyFromPlaceInList].remainingMovePoints);
            }
            if (listOfArmies[armyFromPlaceInList].remainingHeightPoints < listOfArmies[armyToPlaceInList].remainingHeightPoints) {
                listOfArmies[armyToPlaceInList].setRemainingHeightPoints(listOfArmies[armyFromPlaceInList].remainingHeightPoints);
            }
        }
        this.status = 'checked';
        fillEventList();
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        let army1 = listOfArmies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        let army2 = listOfArmies[this.findArmyPlaceInList(this.toArmy, this.realm)];
        if (army1 == undefined || army2 == undefined) {
            this.status = 'withheld';
        }
        else if (army1.x !== this.x || army1.y !== this.y || army2.x !== this.x || army2.y !== this.y) {
            this.status = 'withheld';
        } else if ((army1.armyType() == army2.armyType() || (this.troops === 0 && this.mounts === 0 && this.lkp === 0 && this.skp === 0))
            && army1.x === army2.x && army1.y === army2.y) {
            this.status = 'available';
        }
        else if (((((army1.armyType() == 1 || army1.armyType() == 2) && army1.remainingMovePoints < 3) || army1.armyType() == 3 &&
            army1.remainingMovePoints < 5) && (((army2.armyType() == 1 || army2.armyType() == 2) &&
                army2.remainingMovePoints < 3) || army2.armyType() == 3 && army2.remainingMovePoints < 5))) {
            this.status = 'impossible';
        }
        else {
            this.status = 'withheld';
        }
    }
    
    makeEventListItem(): HTMLElement{
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        
        let innerHTMLString = "<div>" + this.realm.tag + "'s army " + this.fromArmy + " transfers ";
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
        innerHTMLString += "to " + this.toArmy + " in (" + this.x + "," + this.y + ").</div>";
        eli.innerHTML = innerHTMLString;

        return this.commonEventListItem(eli, this.id);
    }
}