import {HexFunction} from "../libraries/hexFunctions";
import {FieldType} from "../map/field";
import {Realm} from "../realm";
import {LandArmy} from "./landArmy";
import {GameState} from "../gameState";
import {Fleet} from "./fleet";
import {Constants} from "../constants";
import FOOTMAN_RP = Constants.FOOTMAN_RP;
import LIGHT_CATA_RP = Constants.LIGHT_CATA_RP;
import HEAVY_CATA_RP = Constants.HEAVY_CATA_RP;
import MOUNT_RP = Constants.MOUNT_RP;
import FOOTMAN_BP = Constants.FOOTMAN_BP;
import MOUNT_BP = Constants.MOUNT_BP;
import LIGHT_CATA_BP = Constants.LIGHT_CATA_BP;
import HEAVY_CATA_BP = Constants.HEAVY_CATA_BP;
import OFFICER_RP = Constants.OFFICER_RP;
import {RiderArmy} from "./riderArmy";
import {Controls} from "../controls/controlVariables";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Drawing} from "../gui/drawingFunctions";
import {ArmyFunctions} from "../libraries/armyFunctions";
import { MountEvent } from "../events/mountEvent";
import { EventStatus } from "../events/eventStatus";
import {Army} from "./army";

export class FootArmy extends LandArmy{
    static readonly MAX_MOVE_POINTS = 9;
    protected mountCount: number;

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, mountCount: number, position: [number, number], movePoints: number, 
                heightPoints: number, isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints, isGuard);
        } else {
            super(id, owner, troopCount, officerCount, lightCatapultCount, heavyCatapultCount, position,
                movePoints, heightPoints);
        }
        this.mountCount = mountCount;
    }

    getErkenfaraID(): number{
        return 100 + this.id;
    }

    getMaxMovePoints(): number{
        return FootArmy.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return FootArmy.MAX_HEIGHT_POINTS;
    }

    getMountCount(): number{
        return this.mountCount;
    }

    setMountCount(value: number): void{
        if(this.canHaveMounts()){
            this.mountCount = Math.max(0,value);
        }
    }

    computeMoveCost(thereIsAStreet: boolean, thereIsAHarbor: boolean, thereIsARiver: boolean, thereIsABridge: boolean,
                    rightOfPassage: boolean, target: [number, number]): number{
        switch(HexFunction.fieldType(target)){
            case FieldType.SHALLOWS:
            case FieldType.DEEPSEA: //watter
                //already embarked
                if(this.transportingFleet != undefined){
                    throw new Error("You are already embarked on a Fleet.");
                    // there are no viable fleets on destination
                } else if(GameState.armies.filter(army => army instanceof Fleet && army.getPosition()[0] === target[0] &&
                        army.getPosition()[1] === target[1] && army.owner === this.owner && (army as Fleet).canLoad(this)).length === 0){
                    throw new Error("You can't walk on Water.");
                    // at least one fleet on destination
                } else {
                    return 0; //embarking doesn't cost move points
                }
            case FieldType.LOWLANDS:
            case FieldType.HILLS:
            case FieldType.DESERT: if(thereIsARiver && !thereIsABridge){ //plains, hills, desert
                if(this.movePoints >= this.getMaxMovePoints()){
                    return this.getMaxMovePoints();
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){//street
                if(rightOfPassage){//right of passage
                    if(this.heavyCatapultCount + this.lightCatapultCount > 0 && this.movePoints >= 4){ //catapults, street & right of passage
                        return 4;
                    } else if (this.movePoints >= 3){ //no catapults, street & right of passage
                        return 3;
                    } else {throw new Error("You don't have enough movement Points.");}
                } else if(this.movePoints >= 4){//street & no right of passage
                    return 4;
                } else {
                    throw new Error("You don't have enough movement Points.");
                }
            } else {//no street
                if(rightOfPassage){//right of passage
                    if(this.heavyCatapultCount + this.lightCatapultCount > 0 && this.movePoints >= 7){ //catapults, no street & right of passage
                        return 7;
                    } else if (this.movePoints >= 4){ //no catapults, no street & right of passage
                        return 4;
                    } else {throw new Error("You don't have enough movement Points.");}
                } else if(this.movePoints >= 7){//no street & no right of passage
                    return 7;
                } else {
                    throw new Error("You don't have enough movement Points.");
                }
            }
            case FieldType.HIGHLANDS: if(thereIsARiver && !thereIsABridge){ //highlands
                if(this.movePoints >= this.getMaxMovePoints()){
                    return 9;
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){ //street
                if(rightOfPassage){ //street & right of passage
                    if(this.heavyCatapultCount > 0 && this.movePoints >= 7){//heavy catas, street & right of passage
                        return 7;
                    } else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4){//light catas, street & right of passage
                        return 4;
                    } else if (this.lightCatapultCount + this.heavyCatapultCount <= 0 && this.movePoints >= 3){//no catas, street & right of passage
                        return 3;
                    } else {throw new Error("You don't have enough movement Points.");}
                } else { //street & no right of passage
                    if(this.heavyCatapultCount > 0){ //heavy catas, street & no right of passage
                        if(this.movePoints >= 7){
                            return 7;
                        } else {throw new Error("You don't have enough movement Points.");}
                    } else if(this.movePoints >= 4){//light or no catas, street & no right of passage
                        return 4;
                    } else {
                        throw new Error("You don't have enough movement Points.");
                    }
                }
            } else { //no street
                if(rightOfPassage){ //no street & right of passage
                    if(this.heavyCatapultCount > 0){//heavy catas, no street & right of passage
                        throw new Error("You need a street to move into the highlands with heavy catapults.");
                    } else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7){//light catas, no street & right of passage
                        return 7;
                    } else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4){//no catas, no street & right of passage
                        return 4;
                    } else {throw new Error("You don't have enough movement Points.");}
                } else { //no street & no right of passage
                    if(this.heavyCatapultCount > 0){//heavy catas, no street & no right of passage
                        throw new Error("You need a street to move into the highlands with heavy catapults.");
                    } else if (this.heavyCatapultCount <= 0 && this.movePoints >= 7){//light or no catas, no street & no right of passage
                        return 7;
                    } else {throw new Error("You don't have enough movement Points.");}
                }
            }
            case FieldType.MOUNTAINS: if(thereIsARiver && !thereIsABridge){ //mountains
                if(this.movePoints >= this.getMaxMovePoints()){
                    return 9;
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){ //street
                if(rightOfPassage){ //street & right of passage
                    if(this.heavyCatapultCount > 0){//heavy catas, street & right of passage
                        throw new Error("You can't move into the mountains with heavy catapults.");
                    } else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4){//light catas, street & right of passage
                        return 4;
                    } else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 3){//no catas, street & right of passage
                        return 3;
                    } else {throw new Error("You don't have enough movement Points.");}
                } else { //street & no right of passage
                    if(this.heavyCatapultCount > 0){//heavy catas, street & no right of passage
                        throw new Error("You can't move into the mountains with heavy catapults.");
                    } else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7){//light catas, street & no right of passage
                        return 7;
                    } else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4){//no catas, street & no right of passage
                        return 4;
                    } else {throw new Error("You don't have enough movement Points.");}
                }
            } else { //no street
                if(this.heavyCatapultCount + this.lightCatapultCount > 0){ //light or heavy catas, no street
                    throw new Error("You need a street to move into the mountains with catapults.");
                } else { //no catas, no street
                    if(rightOfPassage && this.movePoints >= 4){ //no catas, no street & right of passage
                        return 4;
                    } else if(this.movePoints >= 7){ //no catas, no street & no right of passage
                        return 7;
                    } else {throw new Error("You don't have enough movement Points.");}
                }
            }
            case FieldType.WOODS:
            case FieldType.SWAMP: if(thereIsARiver && !thereIsABridge){ //forest, swamp
                if(this.movePoints >= this.getMaxMovePoints()){
                    return 9;
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){ //street
                if(rightOfPassage){ //street & right of passage
                    if(this.heavyCatapultCount > 0 && this.movePoints >= 7){//heavy catas, street & right of passage
                        return 7;
                    } else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 4){//light catas, street & right of passage
                        return 4;
                    } else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 3){//no catas, street & right of passage
                        return 3;
                    } else {throw new Error("You don't have enough movement Points.");}
                } else { //street & no right of passage
                    if(this.heavyCatapultCount > 0 && this.movePoints >= 7){//heavy catas, street & no right of passage
                        return 7;
                    } else if (this.heavyCatapultCount <= 0 && this.movePoints >= 4){//light or no catas, street & no right of passage
                        return 4;
                    } else {throw new Error("You don't have enough movement Points.");}
                }
            } else { //no street
                if(rightOfPassage){ //no street & right of passage
                    if(this.heavyCatapultCount > 0){//heavy catas, no street & right of passage
                        throw new Error("You need a street to move into forest or swamp with heavy catapults.");
                    } else if (this.lightCatapultCount > 0 && this.heavyCatapultCount <= 0 && this.movePoints >= 7){//light catas, no street & right of passage
                        return 7;
                    } else if (this.heavyCatapultCount + this.lightCatapultCount <= 0 && this.movePoints >= 4){//no catas, no street & right of passage
                        return 4;
                    } else {throw new Error("You don't have enough movement Points.");}
                } else { //no street & no right of passage
                    if(this.heavyCatapultCount > 0){//heavy catas, no street & no right of passage
                        throw new Error("You need a street to move into forest or swamp with heavy catapults.");
                    } else if (this.heavyCatapultCount <= 0 && this.movePoints >= 7){//light or no catas, no street & no right of passage
                        return 7;
                    } else {throw new Error("You don't have enough movement Points.");}
                }
            }
        }
    }

    takeRPDamage(rpDamage: number): void{
        this.takeDamage(Math.ceil(rpDamage/(FOOTMAN_RP+
            OFFICER_RP*(this.officerCount/this.troopCount)+
            this.mountCount/this.troopCount+
            LIGHT_CATA_RP*(this.lightCatapultCount/this.troopCount)+
            HEAVY_CATA_RP*(this.heavyCatapultCount/this.troopCount))));
    }

    canHaveCatapults(): boolean{
        return !this.isGuard;
    }

    canHaveMounts(): boolean{
        return !this.isGuard;
    }

    getRoomPointsSansOfficers(): number{
        return this.troopCount * FOOTMAN_RP +
            this.lightCatapultCount * LIGHT_CATA_RP +
            this.heavyCatapultCount * HEAVY_CATA_RP +
            this.mountCount * MOUNT_RP;
    }

    totalBP(): number{
        return this.troopCount * FOOTMAN_BP + this.mountCount * MOUNT_BP +
            this.lightCatapultCount * LIGHT_CATA_BP + this.heavyCatapultCount * HEAVY_CATA_BP;
    }

    takeBPDamage(bpDamage: number): void{
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage * (this.troopCount * FOOTMAN_BP / totalBP) / FOOTMAN_BP);
        this.setMountCount(this.mountCount - bpDamage * (this.mountCount * MOUNT_BP / totalBP) / MOUNT_BP);
        this.setLightCatapultCount(this.lightCatapultCount - bpDamage * (this.lightCatapultCount * LIGHT_CATA_BP /
            totalBP) / LIGHT_CATA_BP);
        this.setHeavyCatapultCount(this.heavyCatapultCount - bpDamage * (this.heavyCatapultCount * HEAVY_CATA_BP /
            totalBP) / HEAVY_CATA_BP);
        this.wasShotAt = true;
    }

    transferTo(armyToTransferTo: Army, troopsToTransfer: number, leadersToTransfer: number, lkpToTransfer: number,
               skpToTransfer: number, mountsToTransfer: number): void{
        super.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer,
            mountsToTransfer);
        if(this.mountCount < mountsToTransfer){
            throw new Error("Not enough mounts to transfer");
        }
        this.troopCount -= troopsToTransfer;
        this.officerCount -= leadersToTransfer;
        this.lightCatapultCount -= lkpToTransfer;
        this.heavyCatapultCount -= skpToTransfer;
        this.mountCount -= mountsToTransfer;
        armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + troopsToTransfer);
        armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        armyToTransferTo.setLightCatapultCount(armyToTransferTo.getLightCatapultCount() + lkpToTransfer);
        armyToTransferTo.setHeavyCatapultCount(armyToTransferTo.getHeavyCatapultCount() + skpToTransfer);
        (armyToTransferTo as FootArmy).setMountCount((armyToTransferTo as FootArmy).getMountCount() + mountsToTransfer);
        if(troopsToTransfer + lkpToTransfer + skpToTransfer + mountsToTransfer > 0){
            armyToTransferTo.setMovePoints(Math.min(this.movePoints, armyToTransferTo.getMovePoints()));
        }
    }

    split(troopsToSplit: number, leadersToSplit: number, lightCatapultsToSplit: number,
                   heavyCatapultsToSplit: number, mountsToSplit: number, newArmyId: number): void{
        if(this.isGuard){
            throw new Error("Guard can't be split.");
        }
        if(troopsToSplit > this.troopCount){
            throw new Error("Not enough troops.");
        }
        if(leadersToSplit > this.officerCount){
            throw new Error("Not enough officers (at least 1 officer must stay with the old army).");
        }
        if(troopsToSplit + 100 > this.troopCount || leadersToSplit + 1 > this.officerCount){
            if(!confirm("The remaining army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if(troopsToSplit < 100 || leadersToSplit < 1){
            if(!confirm("The new army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if(mountsToSplit > this.mountCount){
            throw new Error("Not enough mounts.");
        }
        if(lightCatapultsToSplit > this.lightCatapultCount){
            throw new Error("Not enough light catapults.");
        }
        if(heavyCatapultsToSplit > this.heavyCatapultCount){
            throw new Error("Not enough heavy catapults.");
        }
        GameState.armies.push(new FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, lightCatapultsToSplit,
            heavyCatapultsToSplit, mountsToSplit, this.getPosition(), this.movePoints, this.heightPoints));
        this.troopCount -= troopsToSplit;
        this.officerCount -= leadersToSplit;
        this.mountCount -= mountsToSplit;
        this.lightCatapultCount -= lightCatapultsToSplit;
        this.heavyCatapultCount -= heavyCatapultsToSplit;
    }

    merge(fromArmy: Army): void{
        if(!(fromArmy instanceof FootArmy)){
            throw new Error("Can't merge armies other than foot armies with a foot army.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        this.mountCount += fromArmy.getMountCount();
        this.lightCatapultCount += fromArmy.getLightCatapultCount();
        this.heavyCatapultCount += fromArmy.getHeavyCatapultCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        ArmyFunctions.deleteArmy(fromArmy);
    }

    fireLightCatapults(dicerolls: number[], badConditions: string): number{
        let rollLen = dicerolls.length;
        let damageBP = 0;
        if(badConditions === "lkp"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5; break;
                    case 8: damageBP += 10; break;
                    case 7: damageBP += 40; break;
                    case 6: damageBP += 70; break;
                    case 5: damageBP += 100; break;
                    case 4: damageBP += 125; break;
                    case 3: damageBP += 150; break;
                    case 2: damageBP += 175; break;
                    case 1: damageBP += 200; break;
                    case 0: damageBP += 225; break;
                }
            }
        }
        return damageBP;
    }

    fireHeavyCatapults(dicerolls: number[], badConditions: string): number{
        let rollLen = dicerolls.length;
        let damageBP = 0;
        if(badConditions === "short"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 30; break;
                    case 8: damageBP += 60; break;
                    case 7: damageBP += 90; break;
                    case 6: damageBP += 120; break;
                    case 5: damageBP += 150; break;
                    case 4: damageBP += 180; break;
                    case 3: damageBP += 210; break;
                    case 2: damageBP += 240; break;
                    case 1: damageBP += 270; break;
                    case 0: damageBP += 300; break;
                }
            }
        } else if(badConditions === "high"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0; break;
                    case 8: damageBP += 5; break;
                    case 7: damageBP += 10; break;
                    case 6: damageBP += 30; break;
                    case 5: damageBP += 40; break;
                    case 4: damageBP += 50; break;
                    case 3: damageBP += 65; break;
                    case 2: damageBP += 80; break;
                    case 1: damageBP += 100; break;
                    case 0: damageBP += 120; break;
                }
            }
        } else if(badConditions === "farAndUp"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5; break;
                    case 8: damageBP += 10; break;
                    case 7: damageBP += 30; break;
                    case 6: damageBP += 40; break;
                    case 5: damageBP += 50; break;
                    case 4: damageBP += 65; break;
                    case 3: damageBP += 80; break;
                    case 2: damageBP += 100; break;
                    case 1: damageBP += 120; break;
                    case 0: damageBP += 150; break;
                }
            }
        } else if(badConditions === "far"){
            for (let i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0; break;
                    case 8: damageBP += 5; break;
                    case 7: damageBP += 10; break;
                    case 6: damageBP += 30; break;
                    case 5: damageBP += 50; break;
                    case 4: damageBP += 70; break;
                    case 3: damageBP += 90; break;
                    case 2: damageBP += 110; break;
                    case 1: damageBP += 130; break;
                    case 0: damageBP += 150; break;
                }
            }
        }
        return damageBP;
    }

    // mounting with parameters
    //TODO: If the army has moved, set the new mounted army's move points to the apropriate, non-max value.
    mount(toMount: number, leadersToMount: number, newArmyId?: number): boolean {
        // generiere armyId falls keine vorhanden
        if (newArmyId == undefined) {
            newArmyId = ArmyFunctions.generateArmyId(2, this.owner);
        }
        // sitzen genug Truppen auf?
        if (toMount < 50) {
            window.alert("Es müssen mindestens 50 Reiter in einem Reiterheer sein.");
            return false;
        }
        // sitzen genug Heerführer auf?
        if (leadersToMount < 1) {
            window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
            return false;
        }
        // bleibt ein Hf bei der armee zurück?
        if (toMount != this.troopCount && leadersToMount === this.officerCount) {
            window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
            return false;
        }
        // genug Truppen vorhanden?
        if (toMount != this.troopCount && (toMount * 2 > this.getRoomPointsSansOfficers() - 100)) {
            window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
            return false;
            // genug Reittiere vorhanden?
        }
        // genug Truppen vorhanden?
        if (toMount > this.troopCount) {
            window.alert("Du hast zu wenige Truppen zum aufsitzen");
            return false;
            // genug Reittiere vorhanden?
        }
        else if (toMount > this.mountCount) {
            window.alert("Du hast zu wenige Reittiere zum aufsitzen");
            return false;
            // Sitzen alle auf?
        }
        else if (toMount === this.troopCount) {
            // neues Reiterheer mit generierter Id an selben Koordinaten
            let newArmy = new RiderArmy(newArmyId, this.owner, toMount,
                this.officerCount, this.getPosition(), 0, this.heightPoints, this.isGuard);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            } else {
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            }
            // Nachricht, falls Katapulte vorhanden waren.
            if (this.heavyCatapultCount > 0 || this.lightCatapultCount > 0) {
                window.alert("Da kein Fußheer mehr bestehen bleibt, wurden die Katapulte zerstört.")
            }
            // in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
            GameState.armies.push(newArmy);
            //in GameState.events pushen
            let eventToPush: MountEvent = new MountEvent(GameState.newEvents.length, EventStatus.Undetermined, 
                this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toMount, leadersToMount, 
                [this.position[0], this.position[1]]) 
            GameState.newEvents.push(eventToPush);
            ArmyFunctions.deleteArmy(this);
            BoxVisibility.restoreInfoBox();
            Drawing.drawStuff();
            BoxVisibility.updateInfoBox();
            return true;
        }
        else if (leadersToMount >= this.officerCount) {
            window.alert("Du hast zu wenige Heerführer zum aufsitzen");
            return false;
        }
        else if (this.isGuard) {
            window.alert("Die Garde muss zusammen bleiben");
            return false;
        }
        else {
            // neues Reiterheer mit generierter Id an selben Koordinaten
            let newArmy = new RiderArmy(newArmyId, GameState.armies[Controls.selectedArmyIndex].owner, toMount,
                leadersToMount, this.getPosition(), 0, this.heightPoints, false);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            } else {
                newArmy.setMovePoints(newArmy.getMaxMovePoints());
            }
            // zahlen im alten Heer anpassen
            this.setTroopCount(this.troopCount - toMount);
            this.setOfficerCount(this.officerCount - leadersToMount);
            this.setMountCount(this.mountCount - toMount);
            // in GameState.armies einfügen
            GameState.armies.push(newArmy);
            //in GameState.events pushen
            let eventToPush: MountEvent = new MountEvent(GameState.newEvents.length, EventStatus.Undetermined, 
                this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toMount, leadersToMount, 
                [this.position[0], this.position[1]]) 
            GameState.newEvents.push(eventToPush);
            // Controls.selectedArmyIndex zeigt auf neues Heer
            Controls.selectedArmyIndex = GameState.armies.length - 1;
            Drawing.drawStuff();
            BoxVisibility.restoreInfoBox();
            BoxVisibility.updateInfoBox();
            return true;
        }
    }
}