import {HexFunction} from "../libraries/hexFunctions";
import {FieldType} from "../map/field";
import {Realm} from "../realm";
import {LandArmy} from "./landArmy";
import {GameState} from "../gameState";
import {Fleet} from "./fleet";
import {Constants} from "../constants";
import RIDER_RP = Constants.RIDER_RP;
import OFFICER_RP = Constants.OFFICER_RP;
import RIDER_BP = Constants.RIDER_BP;
import {Controls} from "../controls/controlVariables";
import {MultiFieldFunctions} from "../gui/multifieldFunctions";
import {BoxVisibility} from "../gui/boxVisibilty";
import {FootArmy} from "./footArmy";
import {Drawing} from "../gui/drawingFunctions";
import {ArmyFunctions} from "../libraries/armyFunctions";
import { MountEvent } from "../events/mountEvent";
import { EventStatus } from "../events/eventStatus";
import {Army} from "./army";
import {ShootingCondition, ShootingTarget} from "./shootingFunctions";

export class RiderArmy extends LandArmy{
    static readonly MAX_MOVE_POINTS = 21;

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, position: [number, number],
                movePoints: number, heightPoints: number, isGuard?: boolean){
        if(isGuard != undefined){
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints, isGuard);
        } else {
            super(id, owner, troopCount, officerCount, 0, 0, position, movePoints, heightPoints);
        }
    }

    getErkenfaraID(): number{
        return 200 + this.id;
    }

    getMaxMovePoints(): number{
        return RiderArmy.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return RiderArmy.MAX_HEIGHT_POINTS;
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
                if (rightOfPassage && this.movePoints >= 3){ //street & right of passage
                    return 3;
                } else if(this.movePoints >= 4){ //street & no right of passage
                    return 4;
                } else {
                    throw new Error("You don't have enough movement Points.");
                }
            } else if(rightOfPassage && this.movePoints >= 4){ //no street & right of passage
                return 4;
            } else if(this.movePoints >= 7){ //no street & no right of passage
                return 7;
            } else {
                throw new Error("You don't have enough movement Points.");
            }
            case FieldType.HIGHLANDS: if(thereIsARiver && !thereIsABridge){ //highlands
                if(this.movePoints >= this.getMaxMovePoints()){
                    return this.getMaxMovePoints();
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){
                if (rightOfPassage && this.movePoints >= 4){ //street & right of passage
                    return 4;
                } else if(this.movePoints >= 7){ //street & no right of passage
                    return 7;
                } else {
                    throw new Error("You don't have enough movement Points.");
                }
            } else if(rightOfPassage && this.movePoints >= 7){ //no street & right of passage
                return 7;
            } else if(this.movePoints >= 21){ //no street & no right of passage
                return 21;
            } else {
                throw new Error("You don't have enough movement Points.");
            }
            case FieldType.MOUNTAINS: throw new Error("Cavalry can not move through the mountains."); //mountains
            case FieldType.WOODS:
            case FieldType.SWAMP: if(thereIsARiver && !thereIsABridge){ //forest, swamp
                if(this.movePoints >= this.getMaxMovePoints()){
                    return this.getMaxMovePoints();
                } else {
                    throw new Error("You need you full movement to cross a river.");
                }
            } else if(thereIsAStreet){
                if(rightOfPassage && this.getMovePoints() >= 3){ //street & right of passage
                    return 3;
                } else if(this.getMovePoints() >= 5){ //street & no right of passage
                    return 5;
                } else {
                    throw new Error("You don't have enough movement Points.");
                }
            } else if(rightOfPassage && this.getMovePoints() >= 5){//no street && right of passage
                return 5;
            } else if(this.getMovePoints() >= 10){//no street & no right of passage
                return 10;
            } else {
                throw new Error("You don't have enough movement Points.");
            }
            default: throw new Error("Unknown terrain type.");
        }
    }

    takeRPDamage(rpDamage: number): void{
        this.takeDamage(Math.ceil(rpDamage/(RIDER_RP+OFFICER_RP*(this.officerCount/this.troopCount))));
    }

    canHaveCatapults(): boolean{
        return false;
    }

    canHaveMounts(): boolean{
        return false;
    }

    getRoomPointsSansOfficers(): number{
        return this.troopCount * RIDER_RP;
    }

    totalBP(): number{
        return this.troopCount * RIDER_BP;
    }

    takeBPDamage(bpDamage: number): void{
        let totalBP = this.totalBP();
        this.setOfficerCount(this.officerCount - this.troopCount * (bpDamage / totalBP));
        this.setTroopCount(this.troopCount - bpDamage / RIDER_BP);
        this.wasShotAt = true;
    }

    transferTo(armyToTransferTo: Army, troopsToTransfer: number, leadersToTransfer: number, lkpToTransfer: number,
               skpToTransfer: number, mountsToTransfer: number): void{
        super.transferTo(armyToTransferTo, troopsToTransfer, leadersToTransfer, lkpToTransfer, skpToTransfer,
            mountsToTransfer);
        this.troopCount -= troopsToTransfer;
        this.officerCount -= leadersToTransfer;
        armyToTransferTo.setTroopCount(armyToTransferTo.getTroopCount() + troopsToTransfer);
        armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
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
            throw new Error("Not enough officers.");
        }
        if(troopsToSplit + 50 > this.troopCount || leadersToSplit + 1 > this.officerCount){
            if(!confirm("The remaining army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if(troopsToSplit < 50 || leadersToSplit < 1){
            if(!confirm("The new army is too small and will be destroyed. Proceed anyway?")) {
                throw new Error("Aborted by the user.");
            }
        }
        if(leadersToSplit < 1){
            throw new Error("New army must have at least 1 officer.");
        }
        GameState.armies.push(new FootArmy(newArmyId, this.owner, troopsToSplit, leadersToSplit, 0,
            0, 0, this.getPosition(), this.movePoints, this.heightPoints));
        this.troopCount -= troopsToSplit;
        this.officerCount -= leadersToSplit;
    }

    merge(fromArmy: Army): void{
        if(!(fromArmy instanceof RiderArmy)){
            throw new Error("Can't merge armies other than rider armies with a rider army.");
        }
        this.troopCount += fromArmy.getTroopCount();
        this.officerCount += fromArmy.getOfficerCount();
        if (fromArmy.getMovePoints() < this.getMovePoints()) {
            this.setMovePoints(fromArmy.getMovePoints());
        }
        if (fromArmy.getHeightPoints() < this.getHeightPoints()) {
            this.setHeightPoints(fromArmy.getHeightPoints());
        }
        ArmyFunctions.deleteArmy(fromArmy);
    }

    shootAt(targetCoordinate: [number, number], target: ShootingTarget, lkpToShootCount: number,
            skpToShootCount: number): void{
        throw new Error("Riders can't have catapults.");
    }

    getLightCatapultDamage(diceRolls: number[], conditions: ShootingCondition): number{
        return 0;
    }

    getHeavyCatapultDamage(diceRolls: number[], conditions: ShootingCondition): number{
        return 0;
    }

    // the unMount function of the unMount box
    dismount(toUnMount: number, leadersToUnMount: number, newArmyId?: number) {
        // generiere armyId falls keine vorhanden
        if (newArmyId == undefined) {
            newArmyId = ArmyFunctions.generateArmyId(1, this.owner);
        }
        // sitzen genug Truppen ab?
        if (toUnMount < 100) {
            window.alert("Es müssen mindestens 100 Truppen in einem Fußheer sein.");
            return false;
        }
        // bleibt ein hf be der Armee?
        if (toUnMount != this.troopCount && leadersToUnMount === this.officerCount) {
            window.alert("Es muss mindestens ein Heerführer bei der Armee verbleiben.");
            return false;
        }
        // genug Truppen vorhanden?
        if (toUnMount != this.troopCount && (toUnMount * 2 > this.getRoomPointsSansOfficers() - 100)) {
            window.alert("Es müssen alle aufsitzen, oder mindestens 100 Raumpunkte verbleiben");
            return false;
            // genug Reittiere vorhanden?
        }
        // sitzen genug Heerführer ab?
        if (leadersToUnMount < 1) {
            window.alert("Es muss mindestens ein Heerführer bei der neuen Armee sein.");
            return false;
        }
        if (toUnMount > this.troopCount) {
            window.alert("So viele Truppen hast du nicht zum absitzen")
            return false;
            // genug Truppen vorhanden?
        } else if ((toUnMount == this.troopCount)) {
            // neues Heer mit generierter Id an selben Koordinaten
            let newArmy = new FootArmy(newArmyId, this.owner, toUnMount,
                this.officerCount, 0, 0, toUnMount,
                this.position, 0, this.heightPoints, this.isGuard);
            if (this.movePoints !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            } else newArmy.setMovePoints(newArmy.getMaxMovePoints());
            // in GameState.armies einfügen und alte Armee löschen, ist dann automatisch armyIndex
            GameState.armies.push(newArmy);
            if (this.multiArmyField === true) {
                MultiFieldFunctions.addToMultifield(this, newArmy);
                // deleteFromMultifield(this);
            }
            //in GameState.events pushen
            let eventToPush: MountEvent = new MountEvent(GameState.newEvents.length, EventStatus.Checked,
                this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toUnMount, leadersToUnMount, 
                [this.position[0], this.position[1]]) 
            GameState.newEvents.push(eventToPush);
            ArmyFunctions.deleteArmy(this);
            Drawing.drawStuff();
            BoxVisibility.restoreInfoBox();
            BoxVisibility.updateInfoBox();
            return true;
        // genug Heerführer?
        } else if (leadersToUnMount >= this.officerCount) {
            window.alert("Du hast zu wenige Heerführer zum absitzen");
            return false;
        } else if (this.isGuard) {
            window.alert("Die Garde muss zusammen bleiben");
            return false;
        } else {
            // neues Heer mit generierter Id an selben Koordinaten
            let newArmy = new FootArmy(newArmyId, this.owner, toUnMount, leadersToUnMount, 0,
                0, toUnMount, this.position, 0, this.heightPoints, false);
            if (this.getMovePoints() !== this.getMaxMovePoints()) {
                newArmy.setMovePoints(0);
            } else newArmy.setMovePoints(newArmy.getMaxMovePoints());
            // zahlen im alten Reiterheer anpassen
            this.setTroopCount(this.troopCount - toUnMount);
            this.setOfficerCount(this.officerCount - leadersToUnMount);
            // in GameState.armies einfügen
            GameState.armies.push(newArmy);
            if (this.multiArmyField === true) {
                MultiFieldFunctions.addToMultifield(this, newArmy);
                // deleteFromMultifield(this);
            }
            //in GameState.events pushen
            let eventToPush: MountEvent = new MountEvent(GameState.newEvents.length, EventStatus.Checked,
                this.getErkenfaraID(), newArmy.getErkenfaraID(), this.owner, toUnMount, leadersToUnMount, 
                [this.position[0], this.position[1]]) 
            GameState.newEvents.push(eventToPush);
            // armyIndex zeigt auf neues Heer
            Controls.selectedArmyIndex = GameState.armies.length - 1;
            Drawing.drawStuff();
            BoxVisibility.restoreInfoBox();
            BoxVisibility.updateInfoBox();
            return true;
        }
    }
}