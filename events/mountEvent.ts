class MountEvent extends PhoenixEvent{
    
    constructor(protected id: number, protected type: string, protected status: string, protected fromArmy: number,
        protected newArmy: number, protected realm: Realm, protected troops: number, protected leaders: number, 
        protected x: number, protected y: number){

        super(id, type, status);
    }

    checkEvent(): void{
        console.log("this is a mount event");
        let armyFromPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let newArmyId = this.newArmy;
        let realm = this.realm;
        let toSplit = this.troops;
        let leadersToSplit = this.leaders;
        for (let i = 0; i < listOfArmies.length; i++) {
            if (listOfArmies[i].armyId == armyFromId && listOfArmies[i].owner == realm) {
                armyFromPlaceInList = i;
            }
        }
        console.log("place: " + armyFromPlaceInList);
        if (armyFromPlaceInList >= 0) {
            if (listOfArmies[armyFromPlaceInList].armyType() == 1) {
                mountWithParams(armyFromPlaceInList, toSplit, leadersToSplit, newArmyId);
                this.status = 'checked';
            } else if (listOfArmies[armyFromPlaceInList].armyType() == 2) {
                unMountWithParams(armyFromPlaceInList, toSplit, leadersToSplit, newArmyId);
                this.status = 'checked';
            }
        }
        fillEventList();
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        let typefactor = 1;
        
        let army = listOfArmies[findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = 'withheld';
        } else {
            if (army.armyType() === 2) {
                typefactor = 2;
            }
            else if (army.armyType() === 3) {
                typefactor = 100;
            }
            console.log(army.count + " - " + this.troops);
            if (army.x != this.x || army.y != this.y) {
                this.status = 'withheld';
            } else if ((army.armyType() === 1 && (((army.count - this.troops) >= 0) &&
                ((army.leaders - this.leaders) >= 0) && ((army.mounts - this.troops) >= 0))) ||
                (army.armyType() === 2 && (((army.count - this.troops) >= 0) &&
                    ((army.leaders - this.leaders) >= 0)))) {
                console.log("Status should be available!");
                this.status = 'available';
            } else {
                this.status = 'impossible';
            }
        }
        //console.log(army.count - this.troops);
        if(((army.count - this.troops) >= (100/typefactor)) &&
            ((army.leaders - this.leaders) >= 1) &&
            ((army.mounts - this.mounts) >= 0) &&
            ((army.lkp - this.lkp) >= 0) &&//TODO find out why these would be needed
            ((army.skp - this.skp) >= 0))
        {
            this.status = 'available';
        } 
        else
        {
            this.status = 'impossible';
        }
    }
    
    makeEventListItem(): HTMLElement{
    let eli = document.createElement("DIV");
    eli.classList.add("eventListItem");
    eli.id = "eli" + this.id;
    
    eli.innerHTML = "<div>" + this.realm.tag + "'s army " + this.fromArmy + " mounts " + this.troops + " troops, and "
    + this.leaders + " leaders to " + this.newArmy + " in (" + this.x + "," + this.y + ").</div>";

    return this.commonEventListItem(eli, this.id);
    }
}