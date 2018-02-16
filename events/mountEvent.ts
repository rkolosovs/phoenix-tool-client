class MountEvent extends PhoenixEvent{
    
    constructor(protected id: number, protected status: string, protected fromArmy: number,
        protected newArmy: number, protected realm: Realm, protected troops: number, protected leaders: number, 
         protected x: number, protected y: number, protected pk: number){//protected mounts: number, protected lkp: number, protected skp: number,
            
        super(id, status, pk);

    }

    checkEvent(): void{
        console.log("this is a mount event");
        let armyFromPlaceInList = -1;
        let armyFromId = this.fromArmy;
        let newArmyId = this.newArmy;
        let realm = this.realm;
        let toSplit = this.troops;
        let leadersToSplit = this.leaders;
        for (let i = 0; i < GameState.armies.length; i++) {
            if (GameState.armies[i].getErkenfaraID() == armyFromId && GameState.armies[i].owner == realm) {
                armyFromPlaceInList = i;
            }
        }
        console.log("place: " + armyFromPlaceInList);
        if (armyFromPlaceInList >= 0) {
            if (GameState.armies[armyFromPlaceInList] instanceof FootArmy) {
                mountWithParams(armyFromPlaceInList, toSplit, leadersToSplit, newArmyId);
                this.status = 'checked';
				if (GameState.armies[armyFromPlaceInList] instanceof RiderArmy) {
                    unMountWithParams(armyFromPlaceInList, toSplit, leadersToSplit, newArmyId);
                this.status = 'checked';
                }
            }
        }
        fillEventList();
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        let typefactor = 1;
        
        let army = GameState.armies[this.findArmyPlaceInList(this.fromArmy, this.realm)];
        if (army == undefined) {
            this.status = 'withheld';
        } else {
            if (army instanceof RiderArmy) {
                typefactor = 2;
            }
            else if (army instanceof Fleet) {
                typefactor = 100;
            }
            if (army.getPosition()[0] != this.x || army.getPosition()[1] != this.y) {
                this.status = 'withheld';
            } else if ((army instanceof FootArmy && (((army.getTroopCount() - this.troops) >= 0) &&
                ((army.getOfficerCount() - this.leaders) >= 0) && (((army as FootArmy).getMountCount() - this.troops) >= 0))) ||
                (army instanceof RiderArmy && (((army.getTroopCount() - this.troops) >= 0) &&
                    ((army.getOfficerCount() - this.leaders) >= 0)))) {
                        this.status = 'available';
            } else {
                this.status = 'impossible';
            }
        }
        let mountCount: number = 0;
        let lkpCount: number = 0;
        let skpCount: number = 0;
        if (army instanceof RiderArmy) {
            typefactor = 2;
        }
        else if (army instanceof Fleet) {
            typefactor = 100;
            lkpCount = (army as Fleet).getLightCatapultCount();
            skpCount = (army as Fleet).getHeavyCatapultCount();
        } else if (army instanceof FootArmy) {
            mountCount = (army as FootArmy).getMountCount();
            lkpCount = (army as FootArmy).getLightCatapultCount();
            skpCount = (army as FootArmy).getHeavyCatapultCount();
        }
        if(((army.getTroopCount() - this.troops) >= (100/typefactor)) &&
         ((army.getOfficerCount() - this.leaders) >= 1) &&
         ((mountCount - this.mounts) >= 0) &&//TODO probably needs to go and change the fields in the contrudtor accordingly
         ((lkpCount - this.lkp) >= 0) &&
         ((skpCount - this.skp) >= 0)){
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

    getType(): string{
        return "mount";
    }
}