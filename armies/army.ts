/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

import {GameState} from "../gameState";
import {HexFunction} from "../libraries/hexFunctions";
import {Constants} from "../constants";
import {MobileEntity} from "./mobileEntity";
import {Field} from "../map/field";
import {Realm} from "../realm";
import {ShootingCondition, ShootingTarget} from "./shootingFunctions";

export abstract class Army extends MobileEntity{
    protected troopCount: number;
    protected officerCount: number;
    protected lightCatapultCount: number = 0;
    protected heavyCatapultCount: number = 0;
    protected lightCatapultsShot: number = 0;
    protected heavyCatapultsShot: number = 0;
    multiArmyField: boolean = false;
    targetList: [number, number][] = [];
    isGuard: boolean = false;
    wasShotAt: boolean = false;
    possibleTargets: Field[] = [];

    constructor(id: number, owner: Realm, troopCount: number, officerCount: number, lightCatapultCount: number,
                heavyCatapultCount: number, position: [number, number], movePoints: number, heightPoints: number,
                isGuard?: boolean){
        super(id, owner, position, movePoints, heightPoints);
        
        this.troopCount = Math.max(0, troopCount);
        this.officerCount = Math.max(0, officerCount);
        if(isGuard != undefined){this.isGuard = isGuard;}
        this.setLightCatapultCount(lightCatapultCount);
        this.setHeavyCatapultCount(heavyCatapultCount);
    }

    abstract canHaveCatapults(): boolean;

    abstract canHaveMounts(): boolean;

    abstract getRoomPointsSansOfficers(): number;

    abstract canConquer(): boolean;

    abstract takeBPDamage(bpDamage: number): void;

    abstract totalBP(): number;

    transferTo(armyToTransferTo: Army, troopsToTransfer: number, leadersToTransfer: number,
                        lkpToTransfer: number, skpToTransfer: number, mountsToTransfer: number): void{
        //Common functionality of the transfer functions of all army types.
        if(this.constructor !== armyToTransferTo.constructor &&
            troopsToTransfer + lkpToTransfer + skpToTransfer + mountsToTransfer <= 0) {
            //Transferring officers only.
            if (this.movePoints < this.getMaxMovePoints()){
                throw new Error("Can only transfer officers from armies that haven't moved yet.");
            }
            if (this.officerCount < leadersToTransfer){
                throw new Error("Not enough officers.");
            }
            this.officerCount -= leadersToTransfer;
            armyToTransferTo.setOfficerCount(armyToTransferTo.getOfficerCount() + leadersToTransfer);
        } else if(this.constructor !== armyToTransferTo.constructor){
            //Different army types but attempting to transfer not only officers.
            throw new Error("Can't transfer troops (only officers) between armies of different types.");
        } else if(this.troopCount < troopsToTransfer || this.officerCount < leadersToTransfer ||
            this.lightCatapultCount < lkpToTransfer || this.heavyCatapultCount < skpToTransfer){
            //Same army type but not enough troops/officers/catapults to transfer.
            throw new Error("Not enough troops to transfer.");
        }
    }

    abstract split(troopsToSplit: number, leadersToSplit: number, lightCatapultsToSplit: number,
                   heavyCatapultsToSplit: number, mountsToSplit: number, newArmyId: number): void;

    abstract merge(fromArmy: Army): void;

    abstract getLightCatapultDamage(diceRolls: number[], conditions: ShootingCondition): number;

    abstract getHeavyCatapultDamage(diceRolls: number[], conditions: ShootingCondition): number;

    getTroopCount(): number{
        return this.troopCount;
    }

    getMaxMovePoints(): number{
        return Army.MAX_MOVE_POINTS;
    }

    getMaxHeightPoints(): number{
        return Army.MAX_HEIGHT_POINTS;
    }

    setTroopCount(value: number): void{
        this.troopCount = Math.max(0, value);
    }

    getOfficerCount(): number{
        return this.officerCount;
    }

    setOfficerCount(value: number): void{
        this.officerCount = Math.max(0, value);
    }

    getLightCatapultCount(): number{
        return this.lightCatapultCount;
    }

    setLightCatapultCount(value: number): void{
        if(this.canHaveCatapults()) {
            this.lightCatapultCount = Math.max(0, value);
        }
    }

    getHeavyCatapultCount(): number{
        return this.heavyCatapultCount;
    }

    setHeavyCatapultCount(value: number): void{
        if(this.canHaveCatapults()) {
            this.heavyCatapultCount = Math.max(0, value);
        }
    }

    getHeavyCatapultsShot(): number{
        return this.heavyCatapultsShot;
    }

    addHeavyCatapultsShot(value: number): void{
        if(this.getHeavyCatapultsShot() + Math.max(0, value) <= this.getHeavyCatapultCount()) {
            this.heavyCatapultsShot += Math.max(0, value);
        }
    }

    getLightCatapultsShot(): number{
        return this.lightCatapultsShot;
    }

    addLightCatapultsShot(value: number): void{
        if(this.getLightCatapultsShot() + Math.max(0, value) <= this.getLightCatapultCount()) {
            this.lightCatapultsShot += Math.max(0, value);
        }
    }

    //to find all fields in a two tile proximity
    findShootingTargets() {
        this.targetList = [];
        let tilesInRange: [number, number][] = []
        if (this.heavyCatapultCount - this.heavyCatapultsShot > 0) {//in a 2 tile range
            tilesInRange = HexFunction.neighborInRange(this.position, 2);
        }
        else if (this.lightCatapultCount - this.lightCatapultsShot > 0) {//one tile range
            tilesInRange = HexFunction.neighborInRange(this.position, 1);
        }
        this.targetList = this.checkAllShootingConditions(tilesInRange);
    }

    shootAt(targetCoordinate: [number, number], target: ShootingTarget,
            lkpToShootCount: number, skpToShootCount: number): void{
        if (this.lightCatapultCount - this.lightCatapultsShot < lkpToShootCount) {
            //check if remaining Lkp that have not shot yet
            throw new Error("Die Armee hat nur noch " + (this.lightCatapultCount - this.lightCatapultsShot) +
                " leichte Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
        }
        if (this.heavyCatapultCount - this.heavyCatapultsShot < skpToShootCount) {
            //check if remaining Skp that have not shot yet
            throw new Error("Die Armee hat nur noch " + (this.heavyCatapultCount - this.heavyCatapultsShot) +
                " schwere Katapulte/Kriegsschiffe die noch nicht geschossen haben.");
        }
        if(lkpToShootCount > 0 &&
            this.checkShootingCondition(targetCoordinate, false) === ShootingCondition.Impossible){
            throw new Error("Die leichten Katapulte/Kriegsschiffe können nicht so weit schießen. " +
                "Schieße nur mit schweren Katapulten/Kriegsschiffe oder suche dir ein anderes Ziel aus.");
        }
        if(skpToShootCount > 0 &&
            this.checkShootingCondition(targetCoordinate, true) === ShootingCondition.Impossible){
            throw new Error("Ungültiges Ziel.");
        }
        this.lightCatapultsShot += lkpToShootCount;
        this.heavyCatapultsShot += skpToShootCount;

        //check to see if shooting after moving and stop the army if it moved this turn.
        if (this.movePoints < this.getMaxMovePoints()) {
            this.movePoints = 0;
            this.possibleMoves = [];
        }
    }

    checkAllShootingConditions(targetTileList: [number, number][]): [number, number][] {
        let hasSKP = this.heavyCatapultCount - this.heavyCatapultsShot > 0;
        //filter out all impossible shots
        return targetTileList.filter(target =>
            this.checkShootingCondition(target, hasSKP) !== ShootingCondition.Impossible);
    }

    checkShootingCondition(target: [number, number], skpShot: boolean): ShootingCondition {
        let condition: ShootingCondition = ShootingCondition.Impossible;
        let range = HexFunction.distance(this.position, target);
        if (skpShot) {//skp shooting
            if (range === 1) {//for range of 1
                if (HexFunction.height(target) - HexFunction.height(this.position) <= 2) {
                    condition = ShootingCondition.High;
                }
                if (HexFunction.height(target) - HexFunction.height(this.position) <= 1) {
                    condition = ShootingCondition.Near;
                }
                if (HexFunction.height(target) - HexFunction.height(this.position) === 1 &&
                    HexFunction.findWallInWay(this.position, target).length > 0) {
                    condition = ShootingCondition.High;
                }
            } else if (range === 2) {//for range of 2
                if (HexFunction.height(target) - HexFunction.height(this.position) <= 1) {
                    condition = ShootingCondition.FarAndHigh;
                }
                if (HexFunction.height(target) - HexFunction.height(this.position) < 1) {
                    condition = ShootingCondition.Far;
                }
                if (HexFunction.height(target) - HexFunction.height(this.position) === 0 &&
                    HexFunction.findWallInWay(this.position, target).length > 0) {
                    condition = ShootingCondition.FarAndHigh;
                }
                //if neighbor with range 1 has height diff of 2(in case a high mountain is not allowed)
                let commonNeig = HexFunction.findCommonNeighbor(this.position, target);
                let walls = HexFunction.findWallInWay(this.position, target);
                for (let i = 0; i < commonNeig.length; i++) {
                    if (walls.length > 0) {
                        for (let j = 0; j < walls.length; j++) {
                            if (((HexFunction.height([commonNeig[i][0], commonNeig[i][1]]) -
                                    HexFunction.height(this.position) === 1)
                                    && GameState.buildings[walls[j]].getPosition()[0] === commonNeig[i][0] &&
                                    GameState.buildings[walls[j]].getPosition()[1] === commonNeig[i][1])) {
                                condition = ShootingCondition.Impossible;
                            }
                        }
                    }
                    if (HexFunction.height(commonNeig[i]) - HexFunction.height(this.position) > 1) {
                        condition = ShootingCondition.Impossible;
                    }
                }
            }
        } else {//for lkp shooting
            if (HexFunction.height(target) - HexFunction.height(this.position) <= 1) {
                condition = ShootingCondition.LightCatapults;
            }
        }
        return condition;
    }

    conquer(): void {
        if(this.canConquer()){
            let field: Field = GameState.fields[HexFunction.positionInList(this.position)];
            GameState.realms.forEach(realm => { //delete from other territories (if there)
                let index = realm.territory.indexOf(field);
                if(index !== -1){
                    realm.territory.splice(index, 1);
                }
            });
            this.owner.territory.push(field); //add to owner's realm's territory
        }
    }

    takeDamage(losses: number): void{
        let factor: number = losses / this.troopCount;
        this.setTroopCount(this.troopCount - Math.floor(losses));
        this.setOfficerCount(this.officerCount - Math.floor(this.officerCount * factor));
        this.setLightCatapultCount(this.lightCatapultCount - Math.floor(this.lightCatapultCount * factor));
        this.setHeavyCatapultCount(this.heavyCatapultCount - Math.floor(this.heavyCatapultCount * factor));
    }

    getRoomPoints(): number{
        return this.getRoomPointsSansOfficers() + this.officerCount * Constants.OFFICER_RP;
    }

    leaderGp(): number {
        let gp = 0;

        if(this.officerCount < 101) {
            gp += this.officerCount;
        } else if(this.officerCount < 201) {
            gp += (100 + (this.officerCount-100) / 2 );
        } else {
            gp += 200;
        }

        if(this.isGuard){
            gp += 300;
        }

        return gp;
    }

    isAlive(): boolean{
        //TODO: Check for character leaders on the field once characters are implemented.
        return this.getRoomPointsSansOfficers() >= 100 && this.officerCount >= 1;
    }
}